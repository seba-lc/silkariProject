const { Router } = require("express");
const usersCtrl = require("./../controllers/users.controllers");
const { checkToken } = require("../middlewares/auth");
const { loginValidations, registerValidations } = require("../middlewares/checkUser");

const router = Router();

const { createUser, getUserByEmail, getUserByToken } = usersCtrl

router.route('/')
  .post(loginValidations, getUserByEmail)
  .get(checkToken, getUserByToken);

router.route('/register')
  .post(registerValidations, createUser);

module.exports = router;