const { data } = require("./constants");

const compareCsvFields = (csvdata) => {
  for (let singleField of data["csvFields"]) {
    if (!csvdata.hasOwnProperty(singleField)) {
      return false;
    }
  }
  return true;
};

module.exports = {
  compareCsvFields,
};
