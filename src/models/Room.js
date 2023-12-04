const { model, Schema } = require('mongoose');

const RoomSchema = new Schema({
  room: {
    type: String,
    trim: true,
    required: true,
    minlength: 2,
    maxlength: 15
  },
  //EN PRINCIPIO NO ES NECESARIO, LO ELIMINO POR AHORA
  
  // roomIssues: { //Aca tengo que hacer el type: Schema.Types.ObjectId (que no me acuerdo el nombre de la acción) que me linkee a Issue
  //   type: [Schema.Types.ObjectId],
  //   default: []
  // },
  roomStatus: {
    type: String,
    uppercase: true,
    required: true,
    enum: ['RTS', 'RTC', 'CLEAN', 'CHECKED'],
    trim: true,
    maxlength: 10,
    minlength: 2
  },
  guestIn: {
    type: Boolean,
    required: true
  }
}, {
  versionKey: false,
  timestamps: true
})

module.exports = model('Room', RoomSchema);