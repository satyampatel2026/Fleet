const connection = require("../models/db");

const dashboard = (req, res) => {

    const usersQuery = `
        SELECT
            u.id,
            u.name,
            u.email,
            u.phone,
            u.status,
            GROUP_CONCAT(r.name) AS roles
        FROM users u
        LEFT JOIN user_roles ur
            ON u.id = ur.user_id
        LEFT JOIN roles r
            ON ur.role_id = r.id
        GROUP BY u.id;
    `;

    const partnersQuery = `
        SELECT
            p.id,
            u.name,
            u.email,
            u.phone,
            p.company_name,
            p.address,
            p.status,
            p.created_at
        FROM partners p
        INNER JOIN users u
            ON p.user_id = u.id;
    `;

    connection.query(usersQuery, (userError, users) => {

        if (userError) {
            return res.status(500).json({
                message: userError.message
            });
        }

        connection.query(partnersQuery, (partnerError, partners) => {

            if (partnerError) {
                return res.status(500).json({
                    message: partnerError.message
                });
            }

            res.json({
                total_users: users.length,
                total_partners: partners.length,
                users,
                partners
            });

        });

    });

};

module.exports = {
    dashboard
};