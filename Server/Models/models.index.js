const dbConfig = require("../Config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.admin = require("./admin.model.js")(mongoose);
db.chemical = require("./chemical.model.js")(mongoose);
db.issue = require("./issue.model.js")(mongoose);
db.guest = require("./guest.model.js")(mongoose);
db.faculty = require("./faculty.model.js")(mongoose);
db.storeInCharge = require("./storeInCharge.model.js")(mongoose);

module.exports = db;