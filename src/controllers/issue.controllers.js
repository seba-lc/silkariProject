const Issue = require('./../models/Issue');

const issueCtrl = {};

//AHORA CUANDO HAGA LOS CONTROLADORES DE LAS PARTES TENGO QUE APLICAR EL POPULATE 'partUsed' HERE.

/* description, entryDate, roomAsigned */
issueCtrl.createIssue = async (req, res) => {
  try {
    const newIssue = new Issue(req.body);
    await newIssue.save();
    res.status(200).json({
      message: 'Issue updated correctly',
      issue: newIssue
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Error, try again later'
    })
  }
}

/* _id || status, maintSign, partsUsed, updates, roomAssign || Estos últimos son opcionales */
issueCtrl.updateIssue = async (req, res) => {
  try {
    const issueUpdate = await Issue.findByIdAndUpdate(req.body._id, { status: req.body.status, maintSign: req.body.maintSign, partsUsed: req.body.partsUsed, updates: req.body.updates, roomAsigned: req.body.roomAsigned });
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
    const allRooms = await Issue.find();
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
    const response = await Issue.find({ roomAsigned: req.body.roomAsigned });
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