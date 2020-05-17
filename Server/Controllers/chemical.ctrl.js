const Chemical = require("../Models/models.index").chemical;
const incorrectPrimaryInfo = req =>!req.body.casNumber || !req.body.quantity || !req.body.place
const incorrectSecondaryInfo = req => !req.body.name || !req.body.sds || !req.body.unitType 

function updateChemicalQuantity(req, changeValue){
  // Validate request
  if (incorrectPrimaryInfo(req)) {
    res.status(400).send(getError("Invalid request"));
    return;
  }
  Chemical.updateOne({casNumber: req.body.username, place: req.body.place},  { $inc: { quantity: changeValue } }, function(
    err,
    result
  ) {
    if (err) {
      res.send(getError(err.message || "Error updating chemical."));
    } else {
      res.status(200).send({error: false});
    }
  });
}

exports.create = (req, res) => {
  // Validate request
  if (incorrectPrimaryInfo(req) || incorrectSecondaryInfo(req)) {
    res.status(400).send(getError("Invalid request"));
    return;
  }

  const chemical = new Chemical({
    name: req.body.name,
    casNumber: req.body.casNumber,
    sds: req.body.sds,
    unitType: req.body.unitType,
    quantity: req.body.quantity,
    place: place
  })
  // Save Chemical in the database
  chemical
    .save(chemical)
    .then(data => {
      res.status(200).send({
        error: false
      });
    })
    .catch(err => {
      res.status(500).send(getError(err.message || "Some error occurred while inserting chemical."));
    });
};

exports.take = (req, res) => {
  let decrement = (-1)*parseInt(req.body.quantity)
  updateChemicalQuantity(req, decrement)
};

exports.add = (req, res) => {
  let increment = parseInt(req.body.quantity)
  updateChemicalQuantity(req, increment)
};

exports.get = (req, res) => {
  Chemical.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(getError(err.message || "Some error occurred while retrieving chemicals."));
    });
};