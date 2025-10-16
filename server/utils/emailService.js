const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Gmail address
    pass: process.env.EMAIL_PASS, // App password
  },
});

// Configure Handlebars
transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extname: ".hbs",
      partialsDir: path.resolve("./views/email"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./views/email"),
    extName: ".hbs",
  })
);

module.exports = transporter;
