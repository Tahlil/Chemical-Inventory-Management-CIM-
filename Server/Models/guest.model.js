const userModel = require('./user.model');
module.exports = mongoose => {
  const Guest = mongoose.model(
    "guest",
    mongoose.Schema(
      userModel,
      { timestamps: true }
    )
  );
  return Guest;
};