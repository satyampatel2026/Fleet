const express = require('express');
const cors=require('cors');
const dotenv= require('dotenv');
dotenv.config();

const app= express();
const port=process.env.SERVER_PORT;
app.use(cors());
app.use(express.json());

const userRouter= require("./Routes/userRoute/userRoute");
app.use("/api", userRouter);

const serviceCategoryRouter= require("./Routes/serviceCategoryRoute/serviceCategoryRoute");
app.use("/api" ,serviceCategoryRouter )

const roleRouter=require("./Routes/roleRoute/roleRoute");
app.use("/api/role", roleRouter);

const userRoleRouter= require("./Routes/userRoleRoute/userRoleRoute");
app.use("/api/userrole", userRoleRouter);

const adminDashboardRouter=require("./Routes/adminDashboardRoute/adminDashboardRoute");
app.use("/api/admin/dashboard", adminDashboardRouter);

app.listen(port, ()=>{
    console.log(`server is running on ${port}`)
});