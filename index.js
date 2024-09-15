const express = require("express");
const { connectmongo } = require("./connection");
const app = express();
const port = process.env.PORT || 6001;
const useRouter = require('./routes/crypto');
const path = require("path")
require("dotenv").config();

// Connect to MongoDB
connectmongo(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

// Middleware
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Routes
app.use('', useRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server connected at http://localhost:${port}`);
});
