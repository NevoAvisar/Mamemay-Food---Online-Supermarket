const mongoose = require("mongoose");
const { MONGODB_URI } = require("./default");

async function connect() {
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(MONGODB_URI);
    console.info("DB connected");
  } catch (error) {
    console.error("Could not connect to db");
    console.error(error);
    process.exit(1);
  }
}

module.exports = connect;
