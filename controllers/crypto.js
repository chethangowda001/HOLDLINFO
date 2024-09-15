const axios = require("axios");
const cryptoModel = require("../models/crypto");  // Correcting typo from crptoModel to cryptoModel
const moment = require('moment-timezone');  // Make sure moment-timezone is installed

async function hadleCryptoData(req, res) {
  try {
    // Fetching data from the API
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
    const resData = response.data;

    // Slice the data to get only the first 10 tickers
    const resSlice = Object.values(resData).slice(0, 10);

    // Mapping and creating new instances of cryptoModel
    const CryptoDataMap = resSlice.map((data) => new cryptoModel(data));

    // Saving the array of models to the database
    const savedData = await cryptoModel.insertMany(CryptoDataMap);

    // Reverse the saved data for display
    savedData.reverse();
    const processedData = [];

    // Process the data to format it for the view
    savedData.forEach((data) => {
      let { base_unit, name, buy, sell, volume, open, low, high, last, at } = data;

      // Convert the timestamp and format it to 'Asia/Kolkata' timezone
      const timestamp = moment.utc(at * 1000);
      const tradeTime = timestamp.tz('Asia/Kolkata').format('DD/MM/YYYY [at] h:mm A');

      base_unit = base_unit.toUpperCase();  // Ensure base unit is uppercase

      // Create an object containing the processed data for each base unit
      const processedDoc = {
        baseUnit: base_unit,
        name: name,
        buy: buy,
        sell: sell,
        volume: volume,
        open: open,
        low: low,
        high: high,
        last: last,
        tradeTime: tradeTime,
      };

      processedData.push(processedDoc);
    });

    // Clean up the database by removing all previous entries before inserting new data
    await cryptoModel.deleteMany({});

    // Render the data to the EJS template
    res.render('index', { data: processedData });

  } catch (err) {
    // Error handling
    console.log("Error fetching and storing crypto data:", err.message);
    res.status(500).send('Internal error fetching and storing data');
  }
}

// Export the function if you're using this in a controller for your route
module.exports = { hadleCryptoData };
