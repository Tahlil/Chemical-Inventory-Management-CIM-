const userModel = require('./user.model');
module.exports = mongoose => {
  const StoreInCharge = mongoose.model(
    "Store in-charge",
    mongoose.Schema(
      userModel,
      { timestamps: true }
    )
  );
  return StoreInCharge;
};