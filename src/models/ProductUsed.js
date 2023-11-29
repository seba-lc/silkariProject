const { model, Schema } = require('mongoose');

const ProductUsedSchema = new Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 50
  },
  quantity: {
    type: Number,
    required: true,
    max: 5000,
    min: 0,
    trim: true
  },
  date: {
    type: String,
    trim: true,
    maxlength: 10,
    minlength: 10
  },
  sign: { //email del usuario a cargo || esta la idea de poner el equipo de hk entero a cargo en caso de ser algo de HK
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

module.exports = model('ProductUsed', ProductUsedSchema);

