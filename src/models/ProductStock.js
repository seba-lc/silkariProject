const { model, Schema } = require('mongoose');

const ProductStockSchema = new Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 50
  },
  area: {
    type: String,
    lowercase: true,
    required: true,
    enum: ['housekeeping', 'maintenance'],
    trim: true,
    maxlength: 15,
    minlength: 2
  },
  entryQuantity: {
    type: Number,
    required: true,
    max: 5000,
    min: 0,
    trim: true
  },
  entryDate: {
    type: String,
    trim: true,
    maxlength: 10,
    minlength: 10
  }
}, {
  versionKey: false,
  timestamps: true
});

module.exports = model('ProductStock', ProductStockSchema);