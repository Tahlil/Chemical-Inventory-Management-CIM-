const bcrypt = require('bcrypt'); //Importing the NPM bcrypt package.
const saltRounds = 11;
const Guest = require("../Models/models.index").guest;
const Faculty = require("../Models/models.index").faculty;
const StoreInCharge = require("../Models/models.index").storeInCharge;
const ApproveReq = require("../Models/models.index").approveReq;

const incorrectPrimaryInfo = req => !req.body.userType || !req.body.username || !req.body.password || ["Guest", "Faculty", "Store in-charge"].indexOf(req.body.userType) == -1
const incorrectSecondaryInfo = req => !req.body.firstName || !req.body.lastName || !req.body.position
const getError = errMessage => ({
  error: true,
  message: errMessage
})


function getUser(userType, userInfo) {
  if (userType == "Guest") {
    return Guest;
  } else if (userType == "Faculty") {
    return Faculty;
  } else if (userType == "Store in-charge") {
    return StoreInCharge;
  }
}

exports.register = (req, res) => {
  // Validate request
  if (incorrectPrimaryInfo(req) || incorrectSecondaryInfo(req)) {
    res.status(400).send(getError("Invalid request"));
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

    User = getUser(userType)
    user = new User(userInfo)
    // Save user in the database
    user
      .save(user)
      .then(data => {
        res.status(200).send({error: false});
      })
      .catch(err => {
        res.status(500).send(getError(err.message || "Some error occurred while registering user."));
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
      if (err){
        res.send(getError(err.message || "Error occured."));
        return;
      }
      if(user){
        bcrypt.compare(req.body.password, user.passwordHash, function (err, res) {
          if (res == true) {
            res.status(200).send({error: false});
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

exports.requestApproval = (req, res) => {
  if (incorrectPrimaryInfo(req) || incorrectSecondaryInfo(req)) {
    res.status(400).send(getError("Invalid request"));
    return;
  }
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    const approveReq = new ApproveReq({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      position: req.body.position,
      passwordHash: hash,
      userType: req.body.userType,
      isApproved: false
    });
    // Save approveReq in the database
    approveReq
      .save(approveReq)
      .then(data => {
        res.status(200).send({error: false});
      })
      .catch(err => {
        res.status(500).send(getError(err.message || "Some error occurred while saving approval request."));
      });
  });
};

exports.checkUsername = (req, res) => {
  User = getUser(req.body.userType)
  User.findOne({username: req.body.username}, function(err, user){
    if(err) {
      res.send(getError(err.message || "Error checking username."));
    }
    if(user) {
      res.send({userExist: true})
    } else {
      res.send({userExist: false})
    }
});
}