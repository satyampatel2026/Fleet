const connection = require('../../models/db');

const getServiceCategory = (req, res) => {
      const query = `
        SELECT *
        FROM service_categories
        ORDER BY category_name ASC
    `;
    connection.query(query, function (err, result) {
        if (err) {
            console.log("Error" , err.message);
            return res.status(500).json({message:"Database error"})
        }else { res.send (result); } }) };


      const postServiceCategory = (req, res) => {
       const { category_name, description } = req.body;
      const query = `
        INSERT INTO service_categories
        (category_name, description)
        VALUES (?, ?)
    `;
    connection.query(query,
        [category_name, description],
        (err, result) => {
              if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(400).json({
                    message: "Category already exists"
                });
            } console.log(err.message);
            return res.status(500).json({
                message: "Database error"
            });
        } res.status(201).json({
            message: "Category Added Successfully"
        });
    });
};

      const updateServiceCategory = (req, res) => {
     const { category_name, description, status } = req.body;
    const query = `
        UPDATE service_categories
        SET category_name=?,
            description=?,
            status=?
        WHERE category_id=?
    `;  connection.query(
        query,
        [category_name, description, status, req.params.id],
        (err, result) => {

            if (err) {
                console.log(err.message);
                return res.status(500).json({
                    message: "Database error"
                });
            }
            res.json({
                message: "Category Updated Successfully"
            });
        });  };


            const deleteServiceCategory = (req, res) => {
                let query = "DELETE FROM service_categories where category_id = ?";
                // let query = "UPDATE service_categories SET status='INACTIVE' WHERE category_id=?"
                let data= req.params.id;
                connection.query(query, data, function (err, result) {
                    if (err) {
                        console.log( "ERROR", err.message);
                        return res.status(500).json({message:"Database error"})
                    }else { res.send (result); } }) };

module.exports = { getServiceCategory, postServiceCategory, updateServiceCategory, deleteServiceCategory };