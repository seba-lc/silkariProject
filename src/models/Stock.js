const { model, Schema } = require('mongoose');

const StockSchema = new Schema({
  item: {
    type: Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  area: {
    type: String,
    lowercase: true,
    required: true,
    enum: ['housekeeping', 'maintenance'],
    default: 'maintenance',
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
    minlength: 3,
    maxlength: 50
  }
}, {
  versionKey: false,
  timestamps: true
});

module.exports = model('Stock', StockSchema);