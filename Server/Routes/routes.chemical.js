const ChemicalCtrl = require("../Controllers/chemical.ctrl");
const chemicalRouter = require("express").Router();

chemicalRouter
  .post("/chemical/create", ChemicalCtrl.create)
  .post("/chemical/take", ChemicalCtrl.take)
  .post("/chemical/add", ChemicalCtrl.add)
  .get("/chemical/get", ChemicalCtrl.get)
  .post("/chemical/csv-import", ChemicalCtrl.csvImport);
module.exports = chemicalRouter;
