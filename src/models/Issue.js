const { model, Schema } = require('mongoose');

const IssueSchema = new Schema({
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
  status: {
    type: String,
    lowercase: true,
    enum: ['done', 'not-done', 'contractor'],
    trim: true,
    default: 'not-done',
    maxlength: 15,
    minlength: 2
  },
  sign: { //userEmail
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  partsUsed: [{ //A esto lo linkeo con el modelo Stock.
    type: Schema.Types.ObjectId,
    ref: 'Stock'
  }],
  updates: [{ //voy a generar desde el frontend un comentario que venga con la fecha (dos entradas del front y una salida para el back). Aunque estoy pensando que debería tener una firma también el update
    type: Schema.Types.ObjectId,
    ref: 'IssueUpdate'
  }],
  roomAsigned: {
    type: String,
    trim: true,
    required: true,
    minlength: 2,
    maxlength: 15,
    default: 'N/A'
  }
}, {
  versionKey: false,
  timestamps: true
})

module.exports = model('Issue', IssueSchema);