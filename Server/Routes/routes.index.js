module.exports = function(app) {
  app.use('/api/v1', require('./routes.accounts'));
  app.use('/api/v1/admin', require('./routes.admin'));
};