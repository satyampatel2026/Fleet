const connection = require("../../models/db");

const getUser = (req, res) => {
    let query = "SELECT user_id, full_name, email, status, created_at from users ";
    connection.query(query, function (err, result) {
        if (err) {
            console.log("Error" , err.message);
            return res.status(500).json({message:"Database error"})
        }else { res.send (result); } }) };

const getPartner= (req,res)=>{
    let query= ` SELECT u.user_id, u.full_name, u.email, u.status, r.role_name FROM users u JOIN user_roles ur ON u.user_id=ur.user_id JOIN roles r ON ur.role_id=r.role_id WHERE r.role_name='PARTNER' AND u.status='ACTIVE' `; 
       connection.query(query, function(err,result){
        if(err){
            console.log("Error", err.message);
            return res.status(500).json({message:"Database error"})
        }else {res.send (result);} })   };


  const postPartner = (req, res) => {
  const { full_name, email, password } = req.body;

  connection.beginTransaction((err) => {
    if (err) return res.status(500).json(err);

    connection.query(
      "INSERT INTO users SET ?",
      {
        full_name,
        email,
        password,
        status: "ACTIVE",
      },
      (err, result) => {
        if (err) {
          return connection.rollback(() => {
            res.status(500).json(err);
          });
        }

        connection.query(
          "INSERT INTO user_roles SET ?",
          {
            user_id: result.insertId,
            role_id: 2,
          },
          (err) => {
            if (err) {
              return connection.rollback(() => {
                res.status(500).json(err);
              });
            }

            connection.commit(() => {
              res.json({
                message: "Partner created successfully",
              });
            });
          }
        );
      }
    );
  });
};


const updatePartner = (req, res) => {
  const query =
    "UPDATE users SET full_name=?, email=?, status=? WHERE user_id=?";

  const data = [
    req.body.full_name,
    req.body.email,
    req.body.status,
    req.params.id,
  ];

  connection.query(query, data, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      message: "Partner updated successfully",
    });
  });
};


const deletePartner = (req, res) => {
  connection.query(
    "UPDATE users SET status='INACTIVE' WHERE user_id=?",
    req.params.id,
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Partner removed successfully",
      });
    }
  );
};



const getFleetOwners= (req, res)=>{
     let query =  `SELECT 
u.user_id,
u.full_name,
u.email,
u.status,
r.role_id,
r.role_name
FROM users u
JOIN user_roles ur ON u.user_id=ur.user_id
JOIN roles r ON ur.role_id=r.role_id
WHERE r.role_name='FLEET_OWNER'
AND u.status='ACTIVE' `;
       connection.query(query, function(err,result){
        if (err){
            console.log("Error", err.message);
            return res.status(500).json({message:"Database error"})
        }else {res.send (result); } })     }


const postFleetOwner = (req,res)=>{

const { full_name, email, password }=req.body;

connection.beginTransaction(err=>{
    if(err)
    return res.status(500).json(err);
connection.query( "INSERT INTO users SET ?",
     { full_name, email, password, status:"ACTIVE" }, (err,result)=>{
        if(err)
      return connection.rollback(()=>{
     res.status(500).json(err);
        });

   connection.query( "INSERT INTO user_roles SET ?",
            {  user_id:result.insertId,  role_id:3 }, (err)=>{ 
          if(err) return connection.rollback(()=>{
           res.status(500).json(err);
            });
     connection.commit(()=>{
            res.json({ message:"Fleet Owner created"
            }); });
          }); });
        });  }

        const updateFleetOwner=(req,res)=>{ 
            const query=` UPDATE users SET full_name=?, email=?, status=? WHERE user_id=? `;
          const data=[req.body.full_name, req.body.email, req.body.status, req.params.id ];
          connection.query(query,data,(err,result)=>{
            if(err) return res.status(500).json(err);
            res.json({ message:"Fleet Owner updated" });
            });  }

            const deleteFleetOwner =(req,res)=>{
                connection.query( "UPDATE users SET status='INACTIVE' WHERE user_id=?", req.params.id,
                    (err,result)=>{ if(err) return res.status(500).json(err);
                        res.json({ message:"Fleet Owner removed" });
                        }); }


     const postUser = (req, res) => {
    const userData = {
        full_name: req.body.full_name,
        email: req.body.email,
        password: req.body.password,
        status: req.body.status || "ACTIVE"
    };

    connection.beginTransaction((err) => {
        if (err) {
            return res.status(500).json({
                message: "Transaction error"
            });
        }
        connection.query(
            "INSERT INTO users SET ?",
            userData,
            (err, result) => {

                if (err) {
                    return connection.rollback(() => {
                        res.status(500).json({
                            message: "User insert failed",
                            error: err.message
                        });
                    });
                }
                const roleData = {
                    user_id: result.insertId,
                    role_id: req.body.role_id
                };

                connection.query(
                    "INSERT INTO user_roles SET ?",
                    roleData,
                    (err) => {

                        if (err) {
                            return connection.rollback(() => {
                                res.status(500).json({
                                    message: "Role assign failed",
                                    error: err.message
                                });
                            });
                        }
                        connection.commit((err) => {
                            if (err) {
                                return connection.rollback(() => {
                                    res.status(500).json({
                                        message: "Commit failed"
                                    });
                                });
                            }

                            res.json({
                                message: "User created successfully"
                            });    });
                        }    );   }
        );   });  };

        const updateUser = (req, res) => {
            let query = "UPDATE users set ? where user_id = ?";
            let data= [req.body, req.params.id];
            connection.query(query, data, function (err, result) {
                if (err) {
                    console.log( "ERROR", err.message);
                    return res.status(500).json({message:"Database error"})                 
                } else { res.send (result); } }) };


                const deleteUser = (req, res) => {
                // let query = "DELETE FROM users where user_id = ?";
                let query = `update users set status= 'INACTIVE' where user_id= ? `;
                let data= req.params.id;
                 connection.query(query, data, function (err, result) {
                    if (err) {
                        console.log( "ERROR", err.message);   
                        return res.status(500).json({message:"Database error"})              
                    } else { res.send (result); } }) };

module.exports = { getUser, getPartner, postPartner, updatePartner, deletePartner, getFleetOwners, postFleetOwner,updateFleetOwner, deleteFleetOwner, postUser, updateUser, deleteUser };
           