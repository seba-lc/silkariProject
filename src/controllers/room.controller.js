const Room = require('./../models/Room');

const roomCtrl = {};

/* room */
roomCtrl.createRoom = async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    await newRoom.save();
    res.status(200).json({
      message: 'Room added to DB'
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Error, try again later'
    })
  }
}

roomCtrl.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Error, try again later'
    })
  }
}

/* _id || roomStatus, guestIn || opcionales */
roomCtrl.updateRoom = async (req, res) => {
  try {
    const roomUpdate = await Room.findByIdAndUpdate(req.body._id, { roomStatus: req.body.roomStatus, guestIn: req.status.guestIn }) //quizás podría encontrarlo por habitación instead
    if(roomUpdate !== null) {
      return res.status(200).json({
        message: 'Room updated',
        room: roomUpdate
      });
    }
    res.status(201).json({
      message: 'Room not finded'
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Error, try again later'
    })
  }
}

module.exports = roomCtrl;