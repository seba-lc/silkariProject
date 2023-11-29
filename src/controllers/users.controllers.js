const User = require('./../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usersCtrl = {};

/*userName, userEmail, userPassword*/
usersCtrl.createUser = async (req, res) => {
  try {
    const userInfo = req.body;
    const salt = await bcrypt.genSalt(10);
    userInfo.userPassword = await bcrypt.hash(userInfo.userPassword, salt);
    const newUser = new User(userInfo);
    await newUser.save();

    res.status(200).json({
      message: "User created"
    })
  } catch (error) {
    console.log(error);
    if(error.keyPattern?.userEmail){ //CHECKEAR ESTO
      res.status(201).json({
        message: "Existent user"
      })
      return
    }
    res.status(404).json({
      message: "Error, try again later" //ESTOS MENSAJES TENGO QUE ESTUDIAR COMO LOS MANDAN EN INGLES, LA CONVENCIÓN.
    })
  }
}

usersCtrl.getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({userEmail: req.body.userEmail}, '-createdAt -updatedAt');
    if(user !== null){
      const result = await bcrypt.compare(req.body.userPassword, user.userPassword);
      if(result){
        const token = jwt.sign({id: user._id}, process.env.S_WORD, {expiresIn: process.env.EXPIRATION_TIME});
        res.status(200).json({
          id: token,
          userName: user.userName,
          userEmail: user.userEmail,
          dob: user.dob,
          userRole: user.userRole
        })
      } else {
        res.status(201).json({
          message: "Wrong credentials"
        })
      }
    } else {
      res.status(201).json({
        message: "Wrong credentials"
      })
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "Error, try again later"
    })
  }
}

/*Token from LS*/
usersCtrl.getUserByToken = async (req, res) => {
  try {
    const userLogged = await User.findById(req.id).select('-_id -createdAt -updatedAt -userPassword');
    res.status(200).json(userLogged);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "Error, try again later"
    })
  }
}

//PODRIA CREAR EL CONTROLADOR PARA ELIMINAR UN USUARIO LATER

module.exports = usersCtrl;