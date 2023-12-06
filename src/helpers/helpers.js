const issueCtrl = require("../controllers/issue.controllers");
const Room = require('./../models/Room');

exports.createRooms = async () => {
  for(let i=0; i<89; i++){
    try {
      const newARoom = new Room({
        room: i.toString() + 'A'
      });
      await newARoom.save();
      const newBRoom = new Room({
        room: i.toString() + 'B'
      });
      await newBRoom.save();
    } catch (error) {
      console.log(error);
    }
  }
  return 'Habitaciones guardadas con esito';
}