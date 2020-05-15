module.exports = mongoose => {
  const Chemical = mongoose.model(
    "chemical",
    mongoose.Schema(
      {
        name: { type: String, required: true },
        quantity: { type: String, required: true },
        place: { type: String, required: true },
        issuer: { type: String, required: true }
    },
      { timestamps: true }
    )
  );
  return Chemical;
};