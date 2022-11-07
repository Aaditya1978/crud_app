require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserRoutes = require("./routes/user.route");

// MongoDb connection string
const dbUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.xzlahqm.mongodb.net/user`;

// initialize express app
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// connect to mongodb
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
});

// API routes
app.use("/api", UserRoutes);

// start express app
app.listen(PORT, () => {
  console.log("server started on port " + PORT);
});