const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
   name: 'ping',
   description: 'Shows the ping of the bot',
   /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
   run: async (client, message, args) => {
      if(message.channel.id !== '914114544874426449') 
      return message.reply('You cannot use my commands in here, please use it in <#898894550712602656> channel.')
      
      if(message.channel.id === '914114544874426449') {
         message.channel.send(`My ping is \`${client.ws.ping}\` ms.`)
      }
   }
}
