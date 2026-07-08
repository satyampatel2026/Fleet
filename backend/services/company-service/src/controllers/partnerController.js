const connection = require("../models/db");

// Get all partners
const getPartners = (req, res) => {
    const query = `
SELECT
    p.id,
    p.user_id,
    u.name,
    u.email,
    u.phone,
    p.company_name,
    p.address,
    p.status
FROM partners p
JOIN users u
ON p.user_id = u.id
`;

    connection.query(query, (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }

        res.status(200).json(result);
    });
};

// Add partner
const postPartner = (req, res) => {

    const { name, email, phone, password, company_name, address } = req.body;

    connection.beginTransaction(err => {

        if (err) return res.status(500).json(err);

        connection.query(
            `INSERT INTO users(name,email,phone,password_hash)
             VALUES(?,?,?,?)`,
            [name, email, phone, password],

            (err, userResult) => {

                if (err) {
                    return connection.rollback(() =>
                        res.status(500).json(err)
                    );
                }

                const userId = userResult.insertId;

                connection.query(
                    `INSERT INTO user_roles(user_id,role_id)
                     VALUES(?,3)`,
                    [userId],

                    (err) => {

                        if (err) {
                            return connection.rollback(() =>
                                res.status(500).json(err)
                            );
                        }

                        connection.query(
                            `INSERT INTO partners(user_id,company_name,address)
                             VALUES(?,?,?)`,
                            [userId, company_name, address],

                            (err, partnerResult) => {

                                if (err) {
                                    return connection.rollback(() =>
                                        res.status(500).json(err)
                                    );
                                }

                                connection.commit(err => {

                                    if (err) {
                                        return connection.rollback(() =>
                                            res.status(500).json(err)
                                        );
                                    }

                                    res.status(201).json(partnerResult);
                                });

                            }
                        );

                    }
                );

            }
        );

    });

};

// Delete partner
const deletePartner = (req,res)=>{

    connection.query(
        "SELECT user_id FROM partners WHERE id=?",
        [req.params.id],
        (err,result)=>{

            if(err) return res.status(500).json(err);

            if(result.length===0){
                return res.status(404).json({message:"Partner not found"});
            }

            connection.query(
                "DELETE FROM users WHERE id=?",
                [result[0].user_id],
                (err,response)=>{

                    if(err){
                        return res.status(500).json(err);
                    }

                    res.json(response);

                }
            );

        }
    );

};

// Update partner
const updatePartner = (req,res)=>{

    const {
        user_id,
        name,
        email,
        phone,
        company_name,
        address,
        status
    } = req.body;

    connection.beginTransaction(err=>{

        if(err) return res.status(500).json(err);

        connection.query(
            `UPDATE users
             SET name=?,email=?,phone=?
             WHERE id=?`,
            [name,email,phone,user_id],

            err=>{

                if(err){
                    return connection.rollback(()=>res.status(500).json(err));
                }

                connection.query(
                    `UPDATE partners
                     SET company_name=?,
                         address=?,
                         status=?
                     WHERE id=?`,
                    [
                        company_name,
                        address,
                        status,
                        req.params.id
                    ],

                    (err,result)=>{

                        if(err){
                            return connection.rollback(()=>res.status(500).json(err));
                        }

                        connection.commit(err=>{

                            if(err){
                                return connection.rollback(()=>res.status(500).json(err));
                            }

                            res.json(result);

                        });

                    }
                );

            }

        );

    });

};

module.exports = {
    getPartners,
    postPartner,
    deletePartner,
    updatePartner
};