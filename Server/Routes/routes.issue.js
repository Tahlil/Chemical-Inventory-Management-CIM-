const IssueCtrl = require('../Controllers/account.controller');
const issueRouter = require('express').Router();

issueRouter
  .post('/issue/create', IssueCtrl.create)
  .get('/issue/get', IssueCtrl.get)
module.exports = issueRouter;