const connection=require('../../models/db');

const getDashboard= (req,res)=>{
   const query = `
SELECT
(
    SELECT COUNT(*)
    FROM users u
    JOIN user_roles ur ON u.user_id = ur.user_id
    JOIN roles r ON ur.role_id = r.role_id
    WHERE r.role_name = 'fleet_owner'
      AND u.status = 'ACTIVE'
) AS total_users,

(
    SELECT COUNT(*)
    FROM users u
    JOIN user_roles ur ON u.user_id = ur.user_id
    JOIN roles r ON ur.role_id = r.role_id
    WHERE r.role_name = 'partner'
      AND u.status = 'ACTIVE'
) AS total_partners;
`;
    connection.query(query, (err, result)=>{
        if (err){
            console.log("ERROR", err.message);
            return res.status(500).json({message:"Database error"})
        } else{
           res.json(result[0]);
        }
    })
};

module.exports= {getDashboard};