const userModel = require('./user.model');
module.exports = mongoose => {
  const Faculty = mongoose.model(
    "faculty",
    mongoose.Schema(
      userModel,
      { timestamps: true }
    )
  );
  return Faculty;
};