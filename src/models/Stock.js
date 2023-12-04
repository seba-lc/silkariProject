const { model, Schema } = require('mongoose');

const StockSchema = new Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 50
  },
  productCode: {
    type: String, 
    required: true,
    trim: true,
    maxlength: 40
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
    min: -5000
  },
  entryDate: {
    type: String,
    required: true,
    trim: true,
    maxlength: 10,
    minlength: 10
  },
  sign: { //email del usuario a cargo
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 5,
    maxlength: 50
  }
}, {
  versionKey: false,
  timestamps: true
});

module.exports = model('Stock', StockSchema);