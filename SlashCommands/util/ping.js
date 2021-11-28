const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'Shows the ping of the bot',
  /**
  * @param {Client} client
  * @param {CommandInteraction} interaction
  * @param {String[]} args
  */
  run: async (client, interaction, args) => {
      if(interaction.channelId !== '914114544874426449') 
      return interaction.followUp('You cannot use my commands here use it in the <#914114544874426449> channel')

      if(interaction.channelId === '914114544874426449') {
         interaction.followUp(`My ping is \`${client.ws.ping}\` ms.`)
      }

  }
}
