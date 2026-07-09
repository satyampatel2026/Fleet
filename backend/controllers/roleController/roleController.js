const connection = require("../../models/db");

const getRole = (req, res) => {
    let query = "SELECT * FROM roles ";
    connection.query(query, function (err, result) {
        if (err) {
            console.log("Error" , err.message);
            return res.status(500).json({message: "Database error"});
        }else { res.send (result); } }) };


         const postRole = (req,res)=> {
            let query= "INSERT INTO roles set ? ";
            let data= req.body; 
            connection.query(query, data, function (err,result) {
                if (err) {
                    console.log( "ERROR", err.message);
                    return res.status(500).json({message: "Database error"});
                }else { res.send (result); } }) };

    const updateRole = (req, res) => {
        let query= "update roles set ? where role_id = ?";
        let data = [req.body, req.params.id];
        connection.query(query, data, function (err,result) {
            if (err) {
                console.log( "ERROR", err.message);
                return res.status(500).json({message: "Database error"});
            }else { res.send (result); } }) };


            const deleteRole = (req, res) => {
                let query = "DELETE FROM roles where role_id = ?";
                let data= req.params.id;
                connection.query(query, data, function (err, result) {
                    if (err) {
                        console.log( "ERROR", err.message);
                        return res.status(500).json({message: "Database error"});
                    }else { res.send (result); } }) };

module.exports = { getRole, postRole, updateRole, deleteRole };
            