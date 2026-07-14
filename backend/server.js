const express = require('express');
const cors=require('cors');
const dotenv= require('dotenv');
dotenv.config();

const app= express();
const port=process.env.SERVER_PORT;
app.use(cors());
app.use(express.json());

const userRouter= require("./Routes/userRoute/userRoute");
app.use("/api/users", userRouter);

const adminauthrouter= require("./Routes/adminAuthRoute/adminAuthRoute");
app.use("/api/auth", adminauthrouter);

const serviceCategoryRouter= require("./Routes/serviceCategoryRoute/serviceCategoryRoute");
app.use("/api" ,serviceCategoryRouter )


const adminDashboardRouter=require("./Routes/adminDashboardRoute/adminDashboardRoute");
app.use("/api/admin/dashboard", adminDashboardRouter);

app.listen(port, ()=>{
    console.log(`server is running on ${port}`)
});