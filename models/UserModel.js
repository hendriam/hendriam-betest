const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
        },
        accountNumber: {
            type: Number,
            required: true,
        },
        emailAddress: {
            type: String,
            required: true,
        },
        identityNumber: {
            type: Number,
            required: true,
        },
        created_at: String,
        updated_at: String,
    },
    { timestamps: false }
);

module.exports = mongoose.model("users", UserSchema);
