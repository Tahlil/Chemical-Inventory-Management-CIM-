const userModel = require('./user.model');
module.exports = mongoose => {
  const Admin = mongoose.model(
    "admin",
    mongoose.Schema(
      userModel,
      { timestamps: true }
    )
  );
  return Admin;
};