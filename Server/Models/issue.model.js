module.exports = mongoose => {
  const Issue = mongoose.model(
    "issue",
    mongoose.Schema(
      {
        name: { type: String, required: true },
        casNumber: { type: String, required: true},
        unitType: { type: String, required: true },
        quantity: { type: Number, required: true },
        place: { type: String, required: true },
        issuer: { type: String, required: true },
        issuerPosition: { type: String, required: true }
    },
      { timestamps: true }
    )
  );
  return Issue;
};