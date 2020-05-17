
const AccountCtrl = require('../Controllers/account.controller');

const IssueCtrl = require('../Controllers/account.controller');
const accountRouter = require('express').Router();

accountRouter
  .post('/account/register', AccountCtrl.register)
  .post('/account/login', AccountCtrl.login)
  .post('/account/requestApproval', AccountCtrl.requestApproval)
  .post('/account/checkUsername' ,AccountCtrl.checkUsername)

module.exports = accountRouter;