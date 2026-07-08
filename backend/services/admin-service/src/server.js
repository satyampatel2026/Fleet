const express = require("express");
const cors = require("cors");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Database connection
require("./models/db");


// Routes
const adminRoutes = require("./routes/adminRoute");


// API Routes
app.use("/api/admin", adminRoutes);


// Default Route
app.get("/", (req, res) => {
    res.send("Fleet Management API Running");
});


// Server Port
const PORT = 3000;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});