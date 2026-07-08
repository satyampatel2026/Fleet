const connection = require("../models/db");


// Get all users
const getUsers = (req,res)=>{

const {role}=req.query;


let query = `
SELECT
u.id,
u.name,
u.email,
u.phone,
u.status,
u.created_at,
GROUP_CONCAT(DISTINCT r.name) AS roles

FROM users u

LEFT JOIN user_roles ur
ON u.id=ur.user_id

LEFT JOIN roles r
ON ur.role_id=r.id

`;

if(role){
query += `
WHERE r.name=?
`;
}

query += `
GROUP BY u.id
ORDER BY u.id DESC
`;

connection.query(
query,
role ? [role] : [],
(error,result)=>{

if(error)
return res.status(500).json(error);

res.json(result);

});

};



// Add user
const postUser = (req, res) => {

    console.log("BODY:", req.body);

    const {
        name,
        email,
        phone,
        password_hash,
        status,
        role
    } = req.body;


    connection.beginTransaction((err) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }


        const userQuery = `
            INSERT INTO users
            (name, email, phone, password_hash, status)
            VALUES (?, ?, ?, ?, ?)
        `;


        connection.query(
            userQuery,
            [
                name,
                email,
                phone,
                password_hash,
                status
            ],
            (error, result) => {


                if (error) {
                    return connection.rollback(() => {
                        res.status(500).json({
                            error: error.message
                        });
                    });
                }


                const userId = result.insertId;



                const getRoleQuery = `
                    SELECT id FROM roles WHERE name = ?
                `;



                connection.query(
                    getRoleQuery,
                    [role],
                    (error, roleResult) => {


                        if (error) {
                            return connection.rollback(() => {
                                res.status(500).json({
                                    error: error.message
                                });
                            });
                        }



                        if (roleResult.length === 0) {

                            return connection.rollback(() => {
                                res.status(400).json({
                                    message: "Role not found"
                                });
                            });

                        }



                        const roleId = roleResult[0].id;



                        const roleQuery = `
                            INSERT INTO user_roles
                            (user_id, role_id)
                            VALUES (?, ?)
                        `;



                        connection.query(
                            roleQuery,
                            [
                                userId,
                                roleId
                            ],
                            (error) => {


                                if (error) {
                                    return connection.rollback(() => {
                                        res.status(500).json({
                                            error: error.message
                                        });
                                    });
                                }



                                connection.commit((err) => {


                                    if (err) {

                                        return connection.rollback(() => {
                                            res.status(500).json({
                                                error: err.message
                                            });
                                        });

                                    }



                                    res.status(201).json({
                                        message: "User created successfully",
                                        user_id: userId
                                    });


                                });


                            }
                        );


                    }
                );


            }
        );


    });


};



// Delete user
const deleteUser = (req, res) => {


    const query = "DELETE FROM users WHERE id = ?";

    const data = req.params.id;



    connection.query(
        query,
        data,
        (error, result) => {


            if (error) {

                console.log("Error....", error.message);

                return res.status(500).json({
                    error: error.message
                });

            }



            res.json(result);


        }
    );


};




// Update user
// Update user
const updateUser = (req, res) => {
   console.log("UPDATE BODY:", req.body);
console.log("USER ID:", req.params.id);
    const {
        name,
        email,
        phone,
        status,
        roles
    } = req.body; 
    const role = roles;


    connection.beginTransaction((err) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }


        // 1. Update user basic information
        const userQuery = `
            UPDATE users
            SET
                name = ?,
                email = ?,
                phone = ?,
                status = ?
            WHERE id = ?
        `;


        connection.query(
            userQuery,
            [
                name,
                email,
                phone,
                status,
                req.params.id
            ],
            (error) => {

                if (error) {

                    return connection.rollback(() => {
                        res.status(500).json({
                            error: error.message
                        });
                    });

                }


                // 2. Get role id from role name
                const getRoleQuery = `
                    SELECT id 
                    FROM roles 
                    WHERE name = ?
                `;


                connection.query(
                    getRoleQuery,
                    [role],
                    (error, roleResult) => {


                        if (error) {

                            return connection.rollback(() => {
                                res.status(500).json({
                                    error: error.message
                                });
                            });

                        }


                        if (roleResult.length === 0) {

                            return connection.rollback(() => {
                                res.status(400).json({
                                    message: "Role not found"
                                });
                            });

                        }


                        const roleId = roleResult[0].id;



                        // 3. Update user role
                    const updateRoleQuery = `
                    DELETE FROM user_roles WHERE user_id = ?;

                    INSERT INTO user_roles(user_id, role_id)
                    VALUES (?, ?)  `;


                        connection.query( 
                            updateRoleQuery,
                            [
                                roleId,
                                req.params.id
                            ],  
                            (error, result) => {

                           console.log("ROLE UPDATE RESULT:", result);
                           console.log("ROLE ID:", roleId);
console.log("USER ID:", req.params.id);
                                if (error) {
                                console.log("ROLE UPDATE ERROR:", error);
                                    return connection.rollback(() => {
                                        res.status(500).json({
                                            error: error.message
                                        });
                                    });

                                }



                                // 4. Commit transaction
                                connection.commit((err) => {


                                    if (err) {

                                        return connection.rollback(() => {
                                            res.status(500).json({
                                                error: err.message
                                            });
                                        });

                                    }



                                    res.json({
                                        message: "User updated successfully",
                                        result
                                    });



                                });



                            }
                        );



                    }
                );



            }
        );



    });

};



module.exports = {
    getUsers,
    postUser,
    deleteUser,
    updateUser
};