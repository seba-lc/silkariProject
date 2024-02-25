const { Router } = require('express');
const issueCtrl = require('../controllers/issue.controllers');
const { checkToken } = require('../middlewares/auth');

const router = Router();

const { createIssue, updateIssue, getAllIssues, getIssuesByRoomAsigned } = issueCtrl;

router.route('/')
  .post(/*checkToken,*/ createIssue);

router.route('/room/:room')
  .get(checkToken, getIssuesByRoomAsigned);

router.route('/all')
  .get(/*checkToken,*/ getAllIssues);

router.route('/update')
  .post(/*checkToken,*/ updateIssue); //DE NUEVO, AL PARECER EL UPDATE SE HACE CON EL POST NO CON EL PUT.

module.exports = router;

