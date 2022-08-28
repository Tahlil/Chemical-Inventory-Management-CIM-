const multerFilterFunction = (req, file, cb) => {
  let fileExtension = file.originalname.split(".").pop();
  if (fileExtension !== "csv") {
    return cb(new Error("Only .csv files are allowed"), false);
  }
  cb(null, true);
};

module.exports = {
  multerFilterFunction,
};
