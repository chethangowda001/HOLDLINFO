const {hadleCryptoData} = require("../controllers/crypto");
const express = require("express");
const Router = express.Router();

Router.get('/', hadleCryptoData);

module.exports = Router;
