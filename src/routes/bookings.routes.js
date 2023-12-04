const { Router } = require('express');
const bookingCtrl = require('./../controllers/booking.controllers');
const { checkToken } = require('../middlewares/auth');

const router = Router();

const { newBooking, deleteBooking, getAllBookings } = bookingCtrl;

router.route('/')
  .post(/*checkToken, */newBooking) //aca se pedirá permiso de Admin
  .get(/*checkToken, */getAllBookings); //idem

router.route('/:id')
  .delete(/*checkToken, */deleteBooking); //idem

module.exports = router;
