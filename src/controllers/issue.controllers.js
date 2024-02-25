const { json } = require('express');
const IssueUpdate = require('../models/IssueUpdate');
const Issue = require('./../models/Issue');
const Stock = require('../models/Stock');
const stockCtrl = require('./stock.controller');
const sendEmail = require('../helpers/sendEmail');

const issueCtrl = {};

const { checkStockByItem } = stockCtrl;



//AHORA CUANDO HAGA LOS CONTROLADORES DE LAS PARTES TENGO QUE APLICAR EL POPULATE 'partUsed' HERE.

/* description, entryDate, roomAsigned || para partUsed le tengo que mandar el id || */
//Para eso desde el frontend tengo que mandar las partes usadas primero a Stock, y luego tomo ese id y recien mando el pedido a issue (createIssue)
issueCtrl.createIssue = async (req, res) => {
  try {
    const newIssue = new Issue(req.body);
    await newIssue.save();
    res.status(200).json({
      message: 'Issue created correctly',
      issue: newIssue
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Error, try again later'
    })
  }
}

/* _id || status, maintSign, partsUsed (id), updates, roomAssign || Estos últimos son opcionales */
issueCtrl.updateIssue = async (req, res) => {
  try {
    const update = new IssueUpdate(req.body[0]);
    await update.save();
    const updateId = update._id;

    const renewStock = new Stock(req.body[1]);
    await renewStock.save();
    const stockIds = renewStock._id;
    //esto de stockIds lo deberia acomodar luego porque no estaria mandando todas las partes usadas, solo la ultima.
    const itemStock = await checkStockByItem(req.body[1].item);
    let sum = 0;
    for(let i=0; i<itemStock.length; i++){
      sum = sum + itemStock[i].entryQuantity
    }
    if(sum < 5) {
      await sendEmail('sebalopezx@gmail.com', 'Stock Alert - Silkari Lagoons', req.body[3], sum.toString())
    }

    const issueUpdate = await Issue.findByIdAndUpdate(req.body[2], { status: req.body[0].updateStatus, partsUsed: [stockIds], updates: [updateId] }, { new: true }).populate('partsUsed').populate('updates');
    if(issueUpdate !== null) {
      res.status(200).json({
        message: 'Issue updated correctly',
        issue: issueUpdate
      })
    } else {
      res.status(201).json({
        message: 'Issue not finded'
      })
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Error, try again later'
    })
  }
}

issueCtrl.getAllIssues = async (req, res) => {
  try {
    const allRooms = await Issue.find().populate('partsUsed');
    res.status(200).json(allRooms);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Error, try again later'
    })
  }
}

issueCtrl.getIssuesByRoomAsigned = async (req, res) => {
  try {
    const response = await Issue.find({ roomAsigned: req.params.room }).populate('partsUsed'); //ACA TEMGO QIE ANIDAR OTRO POPULATE PARA VER EL ITEM.
    if(response !== null){
      return res.status(200).json(response);
    }
    res.status(201).json({
      message: 'Not issues finded for that room'
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Error, try again later'
    })
  }
}

module.exports = issueCtrl;