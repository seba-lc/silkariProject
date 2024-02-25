const sendEmail = require('../helpers/sendEmail');
const Item = require('./../models/Item');

const itemCtrl = {};

/* itemName */
itemCtrl.createNewItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    await sendEmail('sebalopezx@gmail.com', 'PRUEBA', 'PRUEBA');
    res.status(200).json({
      message: 'New Item added'
    })

  } catch (error) {
    console.log(error);
    if(error.keyPattern.itemName){
      res.status(201).json({
        message: 'That Item Name already exists, please check'
      })
      return;
    }
    res.status(400).json({
      message: 'Error, try again later'
    })
  }
}

itemCtrl.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Error, try again later'
    })
  }
}

module.exports = itemCtrl;