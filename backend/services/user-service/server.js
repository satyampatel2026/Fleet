const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const userRoutes = require("./routes/userRoutes");


app.use(express.json());


// Partner API
app.use("/api/users", userRoutes);


app.listen(3001, () => {
    console.log("Server running on port 3001");
});