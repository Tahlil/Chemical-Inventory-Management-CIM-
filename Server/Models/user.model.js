module.exports = {
    username: { type: String, required: true, index: { unique: true } },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    position: { type: String, required: true },
    passwordHash: { type: String, required: true }
}