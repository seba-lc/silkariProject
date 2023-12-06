const { model, Schema } = require('mongoose');

const RoomSchema = new Schema({
  room: {
    type: String,
    trim: true,
    required: true,
    minlength: 2,
    maxlength: 30,
    uppercase: true
  },
  roomStatus: {
    type: String,
    uppercase: true,
    required: true,
    enum: ['RTS', 'RTC', 'CLEAN', 'CHECKED'],
    trim: true,
    maxlength: 10,
    minlength: 2,
    default: 'CLEAN'
  },
  guestIn: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  versionKey: false,
  timestamps: true
})

module.exports = model('Room', RoomSchema);