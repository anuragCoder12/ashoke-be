const mongoose = require('mongoose')

const FormSchema = new mongoose.Schema({
 firstName: {
    type: String,
  },
lastName: {
    type: String,
  },
email: {
    type: String,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  message: {
    type: String,
  }
}, {
  timestamps: true})

  module.exports = mongoose.model('Form', FormSchema)