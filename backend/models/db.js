const mysql=require ('mysql2');

const connection = mysql.createConnection({
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
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