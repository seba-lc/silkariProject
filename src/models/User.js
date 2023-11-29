const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 30
  },
  userEmail: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 5,
    maxlength: 50
  },
  userPassword: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    maxlength: 80
  },
  userRole: {
    type: String,
    required: true,
    default: 'undefined',
    lowercase: true,
    enum: ['housekeeping', 'houseman', 'maintenance', 'hkmanager', 'gralmanager', 'undefined'],
    trim: true,
    maxlength: 15,
    minlength: 5
  },
  dob: {
    type: String,
    trim: true,
    required: true,
    default: 'undefined',
    maxlength: 10,
    minlength: 9
  }
}, {
  versionKey: false,
  timestamps: true
});

module.exports = model('User', UserSchema);