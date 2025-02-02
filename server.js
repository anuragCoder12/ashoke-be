const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/dataBase");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
connectDB()
    .then(() => {
      console.log("database connected");
app.listen(process.env.PORT, () => {
  console.log("Server is running on port", process.env.PORT);
});
  })
  .catch((err) => console.log(err));

const postEnquiry = require("./src/routes/enquiry");
const getEnquiries = require("./src/routes/enquiry");
const getEnquiry = require("./src/routes/enquiry");
const deleteEnquiry = require("./src/routes/enquiry");
const savedForm = require("./src/routes/careerForm");
const getAllCareerForms = require("./src/routes/careerForm");
const deleteCareerForm = require("./src/routes/careerForm");
const signUp = require("./src/routes/user");
const login = require("./src/routes/user");

app.use("/api/enquiry", postEnquiry);
app.use("/api/enquiry", getEnquiries);
app.use("/api/enquiry", getEnquiry);
app.use("/api/enquiry", deleteEnquiry);
app.use("/api/careerForm", savedForm);
app.use("/api/careerForm", getAllCareerForms);
app.use("/api/careerForm", deleteCareerForm);
app.use("/api/user", signUp);
app.use("/api/user", login);

