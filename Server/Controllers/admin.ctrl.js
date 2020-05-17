const bcrypt = require('bcrypt'); //Importing the NPM bcrypt package.
const saltRounds = 11;
const admin = require("../Models/models.index").admin;
const incorrectPrimaryInfo = req => !req.body.username || !req.body.password 
const incorrectSecondaryInfo = req => !req.body.firstName || !req.body.lastName || !req.body.position
const getError = errMessage => ({
  error: true,
  message: errMessage
})


exports.register = (req, res) => {
  // Validate request
  if (incorrectPrimaryInfo(req) || incorrectSecondaryInfo(req)) {
    res.status(400).send(getError("Invalid request"));
    return;
  }

  // Create a admin
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    let admin, adminInfo = {
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      position: req.body.position,
      passwordHash: hash
    };

    admin = new Admin(adminInfo)
    // Save user in the database
    admin
      .save(admin)
      .then(data => {
        res.status(200).send({
          error: false
        });
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while registering user."
        });
      });
  });

};

exports.login = (req, res) => {
  // Validate request
  if (incorrectPrimaryInfo(req)) {
    res.status(400).send({
      message: "Invalid request"
    });
    return;
  }
  User = getUser(userType)
  User.findOne({
      "username": req.body.username
    },
    function (err, user) {
      if (err) {
        res.send(getError("Username not found."));
        return;
      }
      bcrypt.compare(req.body.password, user.passwordHash, function (err, res) {
        if (res == true) {
          res.status(200).send({
            error: false
          });
        } else {
          res.send(getError("Incorrect password."));
        }
      });
    });
};
exports.getAllUnauthorized = (req, res) => {

};