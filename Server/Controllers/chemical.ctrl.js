const Chemical = require("../Models/models.index").chemical;
const incorrectPrimaryInfo = (req) =>
  !req.body.casNumber || !req.body.quantity || !req.body.place;
const incorrectPrimaryInfoQuery = (req) =>
  !req.query.casNumber || !req.query.place || !req.query.quantity;
const incorrectSecondaryInfo = (req) =>
  !req.body.name || !req.body.sds || !req.body.unitType;
const getError = (errMessage) => ({
  error: true,
  message: errMessage,
});
const { multerFilterFunction } = require("../Utils/fileUtils");
const multer = require("multer");
const upload = multer({ dest: "Uploads/", fileFilter: multerFilterFunction });
const uploadSingle = upload.single("file");
const csv = require("csvtojson");
const { compareCsvFields, jsonToCsv } = require("../Utils/csvUtils");
const fs = require("fs");
const PDFDocument = require("pdfkit");

function updateChemicalQuantity(req, res, changeValue) {
  // Validate request
  if (incorrectPrimaryInfoQuery(req)) {
    res.status(400).send(getError("Invalid request"));
    return;
  }
  Chemical.updateOne(
    { casNumber: req.query.casNumber, place: req.query.place },
    { $inc: { quantity: changeValue } },
    function (err, result) {
      if (err) {
        res.send(getError(err.message || "Error updating chemical."));
      } else {
        if (result.n !== 1) {
          res.send(getError("Chemical not found."));
        }
      }
    }
  );
}

function createPdf(req, res, changeValue) {
  const pdfDoc = new PDFDocument();
  let chemical = null;
  Chemical.findOne(
    { casNumber: req.query.casNumber, place: req.query.place },
    (err, chem) => {
      chemical = chem;
      res.setHeader("Content-Type", "application/pdf");
      pdfDoc.pipe(res);
      pdfDoc.text("Chemical").text(chemical.name, { align: "right" });
      pdfDoc.text("Cas Number").text(chemical.casNumber, { align: "right" });
      pdfDoc.text("Place").text(chemical.place, { align: "right" });
      pdfDoc
        .text("Change Quantity")
        .text(changeValue + " " + chemical.unitType, { align: "right" });
      pdfDoc
        .text("Current Quantity")
        .text(chemical.quantity + " " + chemical.unitType, { align: "right" });

      pdfDoc.end();
    }
  );
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
    quantity: parseInt(req.body.quantity),
    place: req.body.place,
  });
  // Save Chemical in the database
  chemical
    .save(chemical)
    .then((data) => {
      res.status(200).send({
        error: false,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          getError(
            err.message || "Some error occurred while inserting chemical."
          )
        );
    });
};

exports.remove = (req, res) => {
  // Validate request
  if (!req.body.casNumber) {
    res.status(400).send(getError("Invalid request"));
    return;
  }

  Chemical.deleteOne(
    { casNumber: req.body.casNumber, place: req.body.place },
    function (err) {
      if (err) {
        res.send(getError(err.message || "Error deleting chemical."));
      } else {
        res.status(200).send({ error: false });
      }
    }
  );
};

exports.take = (req, res) => {
  let decrement = -1 * parseInt(req.query.quantity);
  console.log("Decrement: " + decrement);

  updateChemicalQuantity(req, res, decrement);
  createPdf(req, res, decrement);
};

exports.add = (req, res) => {
  let increment = parseInt(req.query.quantity);
  updateChemicalQuantity(req, res, increment);
  createPdf(req, res, increment);
};

exports.get = (req, res) => {
  Chemical.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          getError(
            err.message || "Some error occurred while retrieving chemicals."
          )
        );
    });
};

exports.csvImport = (req, res) => {
  uploadSingle(req, res, async (error) => {
    if (error) {
      res.status(500).send(getError(error.message));
    } else {
      let filepath = req.file.path;
      let csvData = await csv().fromFile(filepath);
      if (compareCsvFields(csvData[0]) === false) {
        fs.unlinkSync(filepath);
        res.status(400).send(getError("Invalid CSV file"));
        return;
      } else {
        for (singleVcsData of csvData) {
          const chemical = new Chemical({
            name: singleVcsData["name"],
            casNumber: singleVcsData["casNumber"],
            sds: singleVcsData["sds"],
            unitType: singleVcsData["unitType"],
            quantity: parseInt(singleVcsData["quantity"]),
            place: singleVcsData["place"],
          });
          try {
            await chemical.save();
          } catch (err) {
            fs.unlinkSync(filepath);
            res.status(500).send(getError(err.message));
            return;
          }
        }
      }
      fs.unlinkSync(filepath);
      res.send({ error: false });
    }
  });
};

exports.csvExport = (req, res) => {
  Chemical.find({})
    .then((data) => {
      res
        .setHeader("Content-Type", "text/csv")
        .attachment("chemical.csv")
        .send(jsonToCsv(data));
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          getError(
            err.message || "Some error occurred while retrieving chemicals."
          )
        );
    });
};
