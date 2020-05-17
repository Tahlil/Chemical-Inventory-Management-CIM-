const userModel = require('./user.model');
userModel.userType = { type: String, required: true }
userModel.isApproved = { type: Boolean, required: true }
module.exports = mongoose => {
  const ApproveReq = mongoose.model(
    "Approval Requests",
    mongoose.Schema(
      userModel,
      { timestamps: true }
    )
  );
  return ApproveReq;
};