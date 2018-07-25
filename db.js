const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MLAB_URI || 'mongodb://localhost/store-multi-locator' )