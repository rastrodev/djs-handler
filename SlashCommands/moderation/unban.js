const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'unban',
  description: 'Unbans a member from the server',
  options: [
     {
        name: 'userid',
        type: 'STRING',
        description: 'Mention a member to unban',
        required: true
     }
  ],
  userPermissions: ['BAN_MEMBERS'],
  /**
  * @param {Client} client
  * @param {CommandInteraction} interaction
  * @param {String[]} args
  */
  run: async (client, interaction) => {
      const userId = interaction.options.getString('userid')

      interaction.guild.members.unban(userId).then((user) => {
         user.send({ content: 'You have been unbanned from the server! Invite Link: https://discord.gg/hkqkZv9vGY' })
         interaction.followUp({ content: `${user.tag} is unbanned from this server!`, ephemeral: true })
      })
      .catch(() => {
         interaction.followUp(
            { content: 'Please mention a valid member to unban!', ephemeral: true }
         )
      })
  }
}
