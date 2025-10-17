const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
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

transporter.verify((err, success) => {
  if (err) console.error("SMTP connection error:", err);
  else console.log("✅ SMTP server ready to send emails!");
});

module.exports = transporter;
