const { Router } = require('express');
const roomCtrl = require('../controllers/room.controller');
const { checkToken } = require('../middlewares/auth');

const router = Router();

const { createRoom, getAllRooms, updateRoom } = roomCtrl;

router.route('/')
  .post(/*checkToken,*/ createRoom)
  .get(/*checkToken,*/ getAllRooms);

router.route('/edit')
  .post(/*checkToken,*/ updateRoom); // AL PARECER EL EDIT NO ES CON PUT Y ES CON POST

module.exports = router;