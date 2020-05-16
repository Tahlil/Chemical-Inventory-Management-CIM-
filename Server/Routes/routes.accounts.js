
const AccountCtrl = require('../Controllers/account.controller');

const IssueCtrl = require('../Controllers/account.controller');
const accountRouter = require('express').Router();

accountRouter
  .post('/account/register', AccountCtrl.register)
  .post('/account/login', AccountCtrl.login)

module.exports = accountRouter;