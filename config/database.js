const mongoose = require("mongoose");
require("dotenv").config();
const connectWithDatabase = async() => {
      await mongoose.connect(process.env.MONGODB_URL)
      .then(() => {
        console.log("connection is successful with database")
      })
      .catch(() => {
         console.log("connection is not successful with database")
      })
}

  
module.exports = connectWithDatabase; 