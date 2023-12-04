const Booking = require('./../models/Booking');

const bookingCtrl = {};

/*name, arrivalDate, departureDate, roomAsigned, emailContact, phoneContact*/
bookingCtrl.newBooking = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(200).json({
      message: 'New booking placed'
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Error, try again later'
    })
  }
}

bookingCtrl.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Error, try again later'
    })
  }
}

bookingCtrl.deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: 'Booking deleted'
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Error, try again later'
    })
  }
}

//DESPUES HARE EL DE EDITAR EL BOOKING

module.exports = bookingCtrl;