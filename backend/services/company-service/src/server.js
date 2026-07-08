const express = require("express");
const app = express();
const cors = require("cors");

const partnerRoutes = require("./routes/partnerRoutes");

app.use(cors());
app.use(express.json());


// Partner API
app.use("/api/partners", partnerRoutes);


app.listen(3002, () => {
    console.log("Server running on port 3002");
});