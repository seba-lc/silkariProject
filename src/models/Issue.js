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
    enum: ['yes', 'no', 'contractor'],
    trim: true,
    maxlength: 15,
    minlength: 2
  },
  maintSign: { //userEmail
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 5,
    maxlength: 50
  },
  partsUsed: { //Aca tengo que hacer el type: Schema.Types.ObjectId (que no me acuerdo el nombre de la acción)
    type: String,
    trim: true,
    lowercase: true,
    maxlength: 100
  },
  updates: { //voy a generar desde el frontend un comentario que venga con la fecha (dos entradas del front y una salida para el back)
    type: String,
    trim: true,
    lowercase: true,
    maxlength: 300
  }
}, {
  versionKey: false,
  timestamps: true
})

module.exports = model('Issue', IssueSchema);