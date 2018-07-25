const mongoose = require('mongoose')

const Schema = mongoose.Schema
const storeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: [{
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    province: String,
    zipcode: {
      type: String,
      required: true,
    }
  }],
  point: Object
})




const Store = mongoose.model('StarBucks', storeSchema)

module.exports = Store