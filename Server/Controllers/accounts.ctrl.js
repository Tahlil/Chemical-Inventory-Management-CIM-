const Guest = require("../Models/models.index").guest;
const Faculty = require("../Models/models.index").faculty;
const StoreInCharge = require("../Models/models.index").storeInCharge;

exports.register = (req, res) => {
  // Validate request
  if (!req.body.userType || !req.body.username || !req.body.firstName || !req.body.lastName || !req.body.position || !req.body.password || ["Guest", "Faculty", "Store in-charge"].indexOf(req.body.userType) == -1) {
    res.status(400).send({
      message: "Invalid request"
    });
    return;
  }

  const userType = req.body.userType;
  // Create a user
  let user, userInfo = {
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    position: req.body.position,
    passwordHash: req.body.password
  };
  if (userType == "Guest") {
    user = new Guest(userInfo)
  } else if (userType == "Faculty") {
    user = new Faculty(userInfo)
  } else if (userType == "Store in-charge") {
    user = new StoreInCharge(userInfo)
  }

  // Save user in the database
  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while registering user."
      });
    });
};

exports.login = (req, res) => {

};