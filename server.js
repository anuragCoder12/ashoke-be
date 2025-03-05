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
const product = require("./src/routes/product");
const region = require("./src/routes/region");
const testimonials = require("./src/routes/testimonials");
const faq = require("./src/routes/faq");
const contactPage = require("./src/routes/contactPage");
const testimonialPage = require("./src/routes/testimonialPage");
const aboutPage = require("./src/routes/about");
const homePage = require("./src/routes/home");
const category = require("./src/routes/category");
const form = require("./src/routes/form");

app.use("/api/enquiry", postEnquiry);
app.use("/api/enquiry", getEnquiries);
app.use("/api/enquiry", getEnquiry);
app.use("/api/enquiry", deleteEnquiry);
app.use("/api/careerForm", savedForm);
app.use("/api/careerForm", getAllCareerForms);
app.use("/api/careerForm", deleteCareerForm);
app.use("/api/user", signUp);
app.use("/api/user", login);
app.use("/api/product", product);
app.use("/api/region", region);
app.use("/api/testimonials", testimonials);
app.use("/api/faq", faq);
app.use("/api/page/contact", contactPage);
app.use("/api/page/testimonialPage", testimonialPage);
app.use("/api/page/testimonialPage", testimonialPage);
app.use("/api/page/abouPage", aboutPage);
app.use("/api/page/homePage", homePage);
app.use("/api/category", category);
app.use("/api/form", form);

