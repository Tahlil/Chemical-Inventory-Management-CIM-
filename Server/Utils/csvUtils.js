const { data } = require("./constants");

const compareCsvFields = (csvdata) => {
  for (let singleField of data["csvFields"]) {
    if (!csvdata.hasOwnProperty(singleField)) {
      return false;
    }
  }
  return true;
};

const jsonToCsv = (jsonData) => {
  if (jsonData.length === 0) {
    return "";
  }

  const replacer = (key, value) =>
    value === null || typeof value === "undefined" ? " " : value;
  let headers = Object.keys(jsonData[0]._doc);
  let csvData = [headers.join(",")];
  csvData = csvData.concat([
    ...jsonData.map((row) =>
      headers.map((key) => JSON.stringify(row[key], replacer)).join(",")
    ),
  ]);
  return csvData.join("\r\n");
};

module.exports = {
  compareCsvFields,
  jsonToCsv,
};
