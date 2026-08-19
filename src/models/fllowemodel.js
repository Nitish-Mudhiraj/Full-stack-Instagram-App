const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
    

    followers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    followee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Follow", followSchema);