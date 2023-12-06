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

roomCtrl.createSilkariRooms = async (req, res) => {
  try {
    for(let i=1; i<90; i++) {
      const newARoom = new Room({room: i.toString() + 'A'});
      const newBRoom = new Room({room: i.toString() + 'B'});
      await newARoom.save();
      await newBRoom.save();
    }
    res.status(200).json({message: 'Silkari Rooms Added'})
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
    const roomUpdate = await Room.findByIdAndUpdate(req.body._id, { roomStatus: req.body.roomStatus, guestIn: req.body.guestIn }, { new: true }) //quizás podría encontrarlo por habitación instead
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

roomCtrl.deleteAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().select('_id');
    rooms.forEach(async i => {
      await Room.findByIdAndDelete(i._id);
    });
    res.status(200).json({message: 'All rooms deleted'});
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Error, try again later'
    })
  }
}

module.exports = roomCtrl;