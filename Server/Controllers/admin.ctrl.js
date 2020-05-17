const bcrypt = require('bcrypt'); //Importing the NPM bcrypt package.
const saltRounds = 11;
const Admin = require("../Models/models.index").admin;
const ApproveReq = require("../Models/models.index").approveReq;
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
    const admin = new Admin({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      position: req.body.position,
      passwordHash: hash
    })
    // Save user in the database
    admin
      .save(admin)
      .then(data => {
        res.status(200).send({
          error: false
        });
      })
      .catch(err => {
        res.status(500).send(getError(err.message || "Some error occurred while registering user."));
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

  Admin.findOne({
      "username": req.body.username
    },
    function (err, admin) {
      if (err) {
        res.send(getError(err.message || "Error occured."));
        return;
      }
      if(admin){
        bcrypt.compare(req.body.password, admin.passwordHash, function (err, res) {
          if (res == true) {
            res.status(200).send({
              error: false
            });
          } else {
            res.send(getError("Incorrect password."));
          }
        });
      }
      else{
        res.send(getError("Username not found."));
      }
      
    });
};

exports.approve = (req, res) => {
  
}

exports.getAllUnauthorized = (req, res) => {

};

exports.checkUsername = (req, res) => {
  Admin.findOne({username: req.body.username}, function(err, admin){
    if(err) {
      res.send(getError(err.message || "Error checking username."));
    }
    if(admin) {
      res.send({userExist: true})
    } else {
      res.send({userExist: false})
    }
});
}