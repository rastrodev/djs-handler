const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'ban',
  description: 'Bans a members from the server',
  options: [
     {
        name: 'user',
        type: 'USER',
        description: 'Mention a user to ban',
        required: true
     },
     {
        name: 'reason',
        type: 'STRING',
        description: 'Valid reason for the ban',
        required: false
     }
  ],
  userPermissions: ['BAN_MEMBERS'],
  /**
  * @param {Client} client
  * @param {CommandInteraction} interaction
  * @param {String[]} args
  */
  run: async (client, interaction) => {
      const target = interaction.options.getMember('user')
      const reason = interaction.options.getString('reason')

      try {
         if(interaction.member.roles.highest.position <= target.roles.highest.position)
         return interaction.followUp({ content: 'You cannot ban them as they have the same or higher position than you!' })

         target.ban({ reason })
         target.send(`You were banned from ${interaction.guild.name}. | Reason: ${reason}`)
         await interaction.followUp({ content: `Banned ${target.user.tag} | Reason: ${reason}` })         
      } catch (err) {
         console.log(err)
         await interaction.followUp({ content: 'Oops.. There was an error in banning!', ephemeral: true })
      }
  }
}
   