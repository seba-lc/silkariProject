const Stock = require('../models/Stock');

const stockCtrl = {};

/* item, area, entryQuantity, entryDate, sign */
stockCtrl.productEntry = async (req, res) => {
  try {
    const newInput = new Stock(req.body);
    await newInput.save();
    res.status(200).json({
      message: 'Product added',
      newInputId: newInput._id //A ESTE LO VOY A USAR PARA GUARDAR LA ENTRY EN EL ISSUE CON EL POPULATE
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Error, try again later'
    })
  }
}

/*productCode*/
stockCtrl.getStockByCode = async (req, res) => {
  try {
    const stock = await Stock.find({ item: req.params.productCode }).populate('item', '-_id itemName');
    res.status(200).json(stock);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Error, try again later'
    })
  }
} 

stockCtrl.deleteEntry = async (req, res) => {
  try {
    await Stock.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: 'Entry deleted'
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Error, try again later'
    })
  }
}

module.exports = stockCtrl;