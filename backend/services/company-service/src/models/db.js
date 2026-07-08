const mysql=require ('mysql2');

const connection = mysql.createConnection({
    user:"root",
    host:"localhost",
    port:3306,
    password:"Satyam@5514" ,
    database: "fleet"
})

connection.connect(function(err){
    if(err){
        console.log("Error....", err.message);
    }
    else{
        console.log("database connected...............")
    }
})

module.exports = connection;