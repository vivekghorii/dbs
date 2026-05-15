const express = require("express");
const cors = require("cors");
const adminUserRoutes = require("../routes/admin.user.routes");
const diamondRoutes = require("../routes/diamond.routes");
const bidRoutes = require("../routes/bid.routes");
const userBidRoutes = require("../routes/user.bid.routes");
const adminBidMonitorRoutes = require("../routes/admin.bid.monitor.routes");




const app = express();

app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require("../routes/auth.routes");
const contactRoutes = require("../routes/contact.routes");

app.get("/", (req, res) => {
  res.send("Diamond Bidding System API Running");
});

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminUserRoutes);
app.use("/api/admin/diamonds", diamondRoutes);
app.use("/api/admin/bids", bidRoutes);
app.use("/api/user/bids", userBidRoutes);
app.use("/api/admin/monitor/bids", adminBidMonitorRoutes);




module.exports = app;
