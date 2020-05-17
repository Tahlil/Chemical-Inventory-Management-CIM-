const IssueCtrl = require('../Controllers/issue.ctrl');
const issueRouter = require('express').Router();

issueRouter
  .post('/issue/create', IssueCtrl.create)
  .get('/issue/get', IssueCtrl.get)
module.exports = issueRouter;