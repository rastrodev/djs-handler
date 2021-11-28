const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const ms = require('ms')

module.exports = {
	name: 'clear',
	description: 'Clears some messages in a specific channel.',
	options: [
		{
			name: 'amount',
			description: 'messages to be cleared',
			type: 'INTEGER',
			required: true
		}
	],
   userPermissions: ["MANAGE_MESSAGES"],
	/**
	 * 
	 * @param {Client} client 
	 * @param {CommandInteraction} interaction 
	 * @param {String[]} args
	 */
	

	run: async(client, interaction, args) => {
		const amount = interaction.options.getInteger('amount')

		if(amount > 100) return interaction.followUp({ content: 'Cannot delete more than 100 messages!' })

		const messages = await interaction.channel.messages.fetch({
			limit: amount + 1,
		})

		const filtered = messages.filter(
			(msg => Date.now() - msg.createdTimestamp < ms('14 days')
		));

		await interaction.channel.bulkDelete(filtered)
         
      const purgeEmbed = new MessageEmbed()
         .setColor('#c5b3ff')
         .setDescription(`<:SP_Tick:907765550736900097> Successfully purged \`${filtered.size - 1}\` messages.`)

		interaction.followUp({ 
			embeds: [purgeEmbed]
		})
		
	}
}