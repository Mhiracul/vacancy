const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // TLS (use this instead of 465)
  secure: false, // use TLS, not SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // must be an APP PASSWORD
  },
  tls: {
    rejectUnauthorized: false,
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
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP connection error:", error);
  } else {
    console.log("✅ Server is ready to send emails!");
  }
});
module.exports = transporter;
