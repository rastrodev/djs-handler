const client = require('../index')

client.on('ready', () => {
   console.log(`${client.user.tag} is online!`)

   client.user.setActivity( `${client.users.cache.size} members`, { type: 'WATCHING' })
})