const mongoose = require("mongoose");
require("dotenv").config();

const connectdb = () => {
  try {
    mongoose.connect(process.env.MongoDBURL);
    console.log("MongoDB DataBase Connected");
  } catch (error) {
    console.log("DataBase Not Connected",error.message);
  }
};

module.exports = connectdb;
