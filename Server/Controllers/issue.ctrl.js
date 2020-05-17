const Issue = require("../Models/models.index").issue;
const incorrectInfo = req => req.body.name || req.body.casNumber || req.body.unitType || req.body.quantity || req.body.place || req.body.issuer || req.body.issuerPosition
exports.create = (req, res) => {
  // Validate request
  if (incorrectInfo(req)) {
    res.status(400).send(getError("Invalid request"));
    return;
  }

  const issue = new Issue({
    name: req.body.name,
    casNumber: req.body.casNumber,
    unitType: req.body.unitType,
    quantity: req.body.quantity,
    place: req.body.place,
    issuer: req.body.issuer,
    issuerPosition: req.body.issuerPosition
  })
  // Save issue in the database
  issue
    .save(issue)
    .then(data => {
      res.status(200).send({
        error: false
      });
    })
    .catch(err => {
      res.status(500).send(getError(err.message || "Some error occurred while inserting chemical."));
    });
};

exports.get = (req, res) => {
  Issue.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(getError(err.message || "Some error occurred while retrieving issues."));
    });
};