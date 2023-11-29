const { model, Schema } = require('mongoose');

const BookingSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    minlength: 2,
    maxlength: 35
  },
  arrivalDate: {
    type: String,
    trim: true,
    maxlength: 10,
    minlength: 10
  },
  departureDate: {
    type: String,
    trim: true,
    maxlength: 10,
    minlength: 10
  },
  roomAsigned: {
    type: String,
    trim: true,
    minlength: 2,
    maxlength: 3
  },
  arrivalTime: {
    type: String,
    trim: true,
    minlength: 5,
    maxlength: 5
  },
  emailContact: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 5,
    maxlength: 50
  },
  phoneContact: {
    type: Number,
    trim: true
  }
}, {
  versionKey: false,
  timestamps: true
})

module.exports = model('Booking', BookingSchema);