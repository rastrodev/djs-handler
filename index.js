const { Client, Collection, MessageEmbed } = require('discord.js')
const mongoose = require('mongoose')
const client = new Client({
   intents: 32767
})
module.exports = client;

// Log System
const logs = require('discord-logs')
logs(client ,{
    debug: true
})

// Mongoose Connection
const { mongooseConnectionString } = require("./config.json");
mongoose.connect(mongooseConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log('Connected to mongodb!'))

client.commands = new Collection()
client.slashCommands = new Collection()
client.config = require('./config.json')
client.prefix = client.config.prefix

require('./handler')(client)

client.login(client.config.token)