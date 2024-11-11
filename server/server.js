const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// Load environment variables from .env file
dotenv.config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const compress = require("compression");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const { PORT } = require("./config/default");
const connect = require("./config/db");
const router = require("./routes");

//create a database connection -> u can also
//create a separate file for this and then import/use that file here

connect();

const app = express();
const port = PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(mongoSanitize());
app.use(compress());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", router);

app.listen(port, () => console.log(`Server is now running on port ${port}`));
