const { model, Schema } = require('mongoose');

const IssueUpdateSchema = new Schema({
  description: {
    type: String,
    trim: true,
    lowercase: true,
    maxlength: 300
  },
  entryDate: {
    type: String,
    trim: true,
    maxlength: 10,
    minlength: 10
  },
  sign: { //userEmail
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 50
  },
  updateStatus: {
    type: String,
    lowercase: true,
    enum: ['done', 'not-done', 'contractor'],
    trim: true,
    default: 'not-done',
    maxlength: 15,
    minlength: 2
  }
}, {
  versionKey: false,
  timestamps: true
});

module.exports = model('IssueUpdate', IssueUpdateSchema);