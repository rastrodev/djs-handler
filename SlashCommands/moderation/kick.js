const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'kick',
  description: 'Kicks a user from the server',
  options: [
     {
        name: 'user',
        description: 'Mention a user to kick',
        type: 'USER',
        required: true 
     },
     {
        name: 'reason',
        description: 'Reason for the kick',
        type: 'STRING',
        required: false
     }
  ],
  userPermissions: ["KICK_MEMBERS"],
  /**
  * @param {Client} client
  * @param {CommandInteraction} interaction
  * @param {String[]} args
  */
  run: async (client, interaction) => {
      const target = interaction.options.getMember('user');
      const reason = interaction.options.getString('reason') || 'No reason provided';

      if(target.roles.highest.position >= interaction.member.roles.highest.position) 
         return interaction.followUp(
            `You can't take action on this member as their role is higher or equal to the roles you have!`
         );

         

         const kickEmbed = new MessageEmbed()
         .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
         .setDescription(`You have been kicked from ${interaction.guild.name}`)
         .addFields(
            
            {
               name: `Reason`,
               value: reason,
               inline: false
            },
            {
               name: `Action by`,
               value: interaction.user.username,
               inline: true,
            }
         )

      await target.send({ embeds: [kickEmbed] })

      target.kick(reason);

      interaction.followUp({ content: `Kicked ${target.user.tag} successfully!`, ephemeral: true })
  }
}
