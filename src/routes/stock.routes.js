const { Router } = require('express');
const stockCtrl = require('../controllers/stock.controller');
const { checkToken } = require('../middlewares/auth');

const router = Router();

const { getStockByCode, productEntry, deleteEntry } = stockCtrl;

router.route('/:productCode')
  .get(/*checkToken, */getStockByCode);

router.route('/')
  .post(/*checkToken, */productEntry);

router.route('/:id')
  .delete(/*checkToken, */deleteEntry);

module.exports = router;