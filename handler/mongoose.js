const { mongooseConnectionString } = require('../config.json')
const mongoose = require('mongoose')

mongoose.connect(mongooseConnectionString, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
})