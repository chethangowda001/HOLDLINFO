const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cryptoSchema = Schema({
    base_unit: {
        type: String
    },
    quote_unit: {
        type: String
    },
    low: {
        type: Number
    },
    high: {
        type: Number
    },
    last: {
        type: Number
    },
    type: {
        type: String
    },
    open: {
        type: Number
    },
    volume: {
        type: Number
    },
    sell: {
        type: Number
    },
    buy: {
        type: Number
    },
    at: {
        type: Number
    },
    name: {
        type: String
    }
});

const crptoModel = mongoose.model("crypto", cryptoSchema)

module.exports = crptoModel;