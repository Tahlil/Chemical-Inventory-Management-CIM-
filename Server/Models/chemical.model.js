module.exports = mongoose => {
  const Chemical = mongoose.model(
    "chemical",
    mongoose.Schema(
      {
        name: { type: String, required: true},
        casNumber: { type: String, required: true, index: { unique: true }},
        sds: { type: String, required: true },
        unitType: { type: String, required: true },
        quantity: { type: Number, required: true },
        place: { type: String, required: true }
    },
      { timestamps: true }
    )
  );
  return Chemical;
};