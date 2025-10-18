const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const recruiterRoutes = require("./routes/recruiterRoutes");
const recruiterJobRoutes = require("./routes/recruiterJobRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const jobRoutes = require("./routes/jobRoutes");
const userRoutes = require("./routes/userRoutes");
const userPaymentRoutes = require("./routes/userPaymentRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const jobAlertRoutes = require("./routes/jobAlertRoutes");

const app = express();

// ✅ Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:5173", // your frontend
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("✅ API WORKING"));

app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/recruiter", recruiterRoutes);
app.use("/api/jobs", recruiterJobRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/user/jobs", jobRoutes);
app.use("/api/user/payment", userPaymentRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/user", userRoutes);
app.use("/api/job-alert", jobAlertRoutes);

// ✅ Start server only after DB connects
async function startServer() {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error("❌ Failed to connect to database:", error);
    process.exit(1);
  }
}

startServer();
