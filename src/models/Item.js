const { model, Schema } = require('mongoose');

const ItemSchema = new Schema({
  itemName: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    minlength: 2,
    maxlength: 35
  }
}, {
  timestamps: true,
  versionKey: false
})

module.exports = model('Item', ItemSchema);