const connection = require('../../models/db');

const getUserRole = (req, res) => {
    let query = "SELECT * FROM user_roles";
    connection.query(query, function (err, result) {
        if (err) {
            console.log("Error" , err.message);
            return res.status(500).json({message:"Database error"})
        }else { res.send (result); } }) };


         const postUserRole = (req,res)=> {
            let query= "INSERT INTO user_roles set ? ";
            let data= req.body; 
            connection.query(query, data, function (err,result) {
                if (err) {
                    console.log( "ERROR", err.message);
                    return res.status(500).json({message:"Database error"})
                }else { res.send (result); } }) };

    const updateUserRole = (req, res) => {
        let query= "update roles set ? where user_id = ?";
        let data = [req.body, req.params.id];
        connection.query(query, data, function (err,result) {
            if (err) {
                console.log( "ERROR", err.message);
                return res.status(500).json({message:"Database error"})
            }else { res.send (result); } }) };


            const deleteUserRole = (req, res) => {
                let query = "DELETE FROM user_roles where role_id = ?";
                let data= req.params.id;
                connection.query(query, data, function (err, result) {
                    if (err) {
                        console.log( "ERROR", err.message);
                        return res.status(500).json({message:"Database error"})
                    }else { res.send (result); } }) };

module.exports = { getUserRole, postUserRole, updateUserRole, deleteUserRole };