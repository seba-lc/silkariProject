const { Router } = require('express');
const itemCtrl = require('../controllers/item.controller');
const { checkToken } = require('../middlewares/auth');

const router = Router();

const { createNewItem, getAllItems } = itemCtrl;

router.route('/')
  .post(/*checkToken,*/ createNewItem)
  .get(/*checkToken,*/ getAllItems);

module.exports = router;