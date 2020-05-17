const AdminCtrl = require('../Controllers/account.controller');
const adminRouter = require('express').Router();
adminRouter
  .post('/account/register', AdminCtrl.register)
  .post('/account/login', AdminCtrl.login)
  .post('/account/approve', AdminCtrl.approve)
  .get('/account/unauthorized', AdminCtrl.getAllUnauthorized)
  .post('/account/checkUsername' ,AdminCtrl.checkUsername)

module.exports = adminRouter;