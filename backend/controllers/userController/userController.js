const connection = require("../../models/db");
const bcrypt = require("bcryptjs");


const getUsers = (req, res) => {
  const { search, role_id, role, status } = req.query;

  let query = `SELECT u.user_id, u.full_name, u.email, u.status, u.created_at,r.role_id,r.role_name FROM users u LEFT JOIN user_roles ur ON u.user_id = ur.user_id LEFT JOIN roles r ON ur.role_id = r.role_id WHERE 1 = 1 `;

  const queryData = [];

  // Search by name or email
  if (search && search.trim() !== "") {
    query += `AND ( u.full_name LIKE ? OR u.email LIKE ? ) `;

    const searchValue = `%${search.trim()}%`;

    queryData.push(searchValue, searchValue);
  }

  // Filter by role ID
  if (role_id && role_id !== "all") {
    query += " AND r.role_id = ?";
    queryData.push(Number(role_id));
  }

  // Filter by role name
  if (role && role !== "all") {
    query += " AND r.role_name = ?";
    queryData.push(role.toUpperCase());
  }

  // Filter by user status
  if (status && status !== "all") {
    query += " AND u.status = ?";
    queryData.push(status.toUpperCase());
  }

  query += " ORDER BY u.user_id DESC";

  connection.query(query, queryData, (error, result) => {
    if (error) {
      console.error("Get users error:", error.message);

      return res.status(500).json({
        success: false,
        message: "Failed to load users",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      total: result.length,
      data: result,
    });
  });
};


const getUserById = (req, res) => {
  const userId = req.params.id;

  const query = ` SELECT u.user_id, u.full_name, u.email, u.status, u.created_at, r.role_id, r.role_name FROM users u LEFT JOIN user_roles ur ON u.user_id = ur.user_id LEFT JOIN roles r ON ur.role_id = r.role_id WHERE u.user_id = ? `;

  connection.query(query, [userId], (error, result) => {
    if (error) {
      console.error("Get user error:", error.message);

      return res.status(500).json({
        success: false,
        message: "Failed to load user",
        error: error.message,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: result[0],
    });
  });
};



const getRoles = (req, res) => {
  const query = ` SELECT role_id, role_name FROM roles ORDER BY role_id ASC `;

  connection.query(query, (error, result) => {
    if (error) {
      console.error("Get roles error:", error.message);

      return res.status(500).json({
        success: false,
        message: "Failed to load roles",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  });
};


const postUser = async (req, res) => {
  const { full_name, email, password, role_id, status = "ACTIVE", } = req.body;

  // Required fields validation
  if (!full_name || !email || !password || !role_id) {
    return res.status(400).json({
      success: false,
      message:
        "Full name, email, password and role are required",
    });
  }

  const normalizedStatus = status.toUpperCase();

  if (!["ACTIVE", "INACTIVE"].includes(normalizedStatus)) {
    return res.status(400).json({
      success: false,
      message: "Status must be ACTIVE or INACTIVE",
    });
  }

  connection.beginTransaction((transactionError) => {
    if (transactionError) {
      console.error(
        "Transaction error:",
        transactionError.message
      );

      return res.status(500).json({
        success: false,
        message: "Unable to start transaction",
      });
    }

    // Check selected role exists
    const checkRoleQuery = `
      SELECT role_id, role_name
      FROM roles
      WHERE role_id = ?
    `;

    connection.query(
      checkRoleQuery,
      [role_id],
      async(roleError, roleResult) => {
        if (roleError) {
          return connection.rollback(() => {
            res.status(500).json({
              success: false,
              message: "Role validation failed",
              error: roleError.message,
            });
          });
        }

        if (roleResult.length === 0) {
          return connection.rollback(() => {
            res.status(400).json({
              success: false,
              message: "Invalid role selected",
            });
          });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = {
          full_name: full_name.trim(),
          email: email.trim().toLowerCase(),
          password: hashedPassword,
          status: normalizedStatus,
        };

        connection.query(
          "INSERT INTO users SET ?",
          userData,
          (userError, userResult) => {
            if (userError) {
              return connection.rollback(() => {
                if (userError.code === "ER_DUP_ENTRY") {
                  return res.status(409).json({
                    success: false,
                    message:
                      "A user with this email already exists",
                  });
                }

                return res.status(500).json({
                  success: false,
                  message: "User creation failed",
                  error: userError.message,
                });
              });
            }

            const roleData = {
              user_id: userResult.insertId,
              role_id: Number(role_id),
            };

            connection.query(
              "INSERT INTO user_roles SET ?",
              roleData,
              (userRoleError) => {
                if (userRoleError) {
                  return connection.rollback(() => {
                    res.status(500).json({
                      success: false,
                      message: "Role assignment failed",
                      error: userRoleError.message,
                    });
                  });
                }

                connection.commit((commitError) => {
                  if (commitError) {
                    return connection.rollback(() => {
                      res.status(500).json({
                        success: false,
                        message: "Transaction commit failed",
                        error: commitError.message,
                      });
                    });
                  }

                  return res.status(201).json({
                    success: true,
                    message: "User created successfully",
                    data: {
                      user_id: userResult.insertId,
                      full_name: userData.full_name,
                      email: userData.email,
                      status: userData.status,
                      role_id: Number(role_id),
                      role_name: roleResult[0].role_name,
                    },
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


const updateUser =  async(req, res) => {
  const userId = req.params.id;

  const {full_name, email, password, role_id, status,} = req.body;

  if (!full_name || !email || !role_id || !status) {
    return res.status(400).json({
      success: false,
      message:
        "Full name, email, role and status are required",
    });
  }

  const normalizedStatus = status.toUpperCase();

  if (!["ACTIVE", "INACTIVE"].includes(normalizedStatus)) {
    return res.status(400).json({
      success: false,
      message: "Status must be ACTIVE or INACTIVE",
    });
  }

  connection.beginTransaction((transactionError) => {
    if (transactionError) {
      console.error(
        "Transaction error:",
        transactionError.message
      );

      return res.status(500).json({
        success: false,
        message: "Unable to start transaction",
      });
    }

    // Check whether user exists
    connection.query(
      "SELECT user_id FROM users WHERE user_id = ?",
      [userId],
      (findUserError, findUserResult) => {
        if (findUserError) {
          return connection.rollback(() => {
            res.status(500).json({
              success: false,
              message: "User validation failed",
              error: findUserError.message,
            });
          });
        }

        if (findUserResult.length === 0) {
          return connection.rollback(() => {
            res.status(404).json({
              success: false,
              message: "User not found",
            });
          });
        }

        // Check whether selected role exists
        connection.query(
          `SELECT role_id, role_name FROM roles WHERE role_id = ?  `,
          [role_id],
          async(roleError, roleResult) => {
            if (roleError) {
              return connection.rollback(() => {
                res.status(500).json({
                  success: false,
                  message: "Role validation failed",
                  error: roleError.message,
                });
              });
            }

            if (roleResult.length === 0) {
              return connection.rollback(() => {
                res.status(400).json({
                  success: false,
                  message: "Invalid role selected",
                });
              });
            }

            let updateUserQuery;
            let updateUserData;

            // Password diya hai to password bhi update karo
            if (
              password &&
              typeof password === "string" &&
              password.trim() !== ""
            ) {  const hashedPassword = await bcrypt.hash( password.trim(), 10);
              updateUserQuery = `UPDATE users SET full_name = ?, email = ?, password = ?, status = ? WHERE user_id = ? `;

              updateUserData = [
                full_name.trim(),
                email.trim().toLowerCase(),
                hashedPassword,
                normalizedStatus,
                userId,
              ];
            } else {
              updateUserQuery = ` UPDATE users SET full_name = ?, email = ?, status = ? WHERE user_id = ?  `;

              updateUserData = [
                full_name.trim(),
                email.trim().toLowerCase(),
                normalizedStatus,
                userId,
              ];
            }

            connection.query(
              updateUserQuery,
              updateUserData,
              (updateUserError) => {
                if (updateUserError) {
                  return connection.rollback(() => {
                    if (
                      updateUserError.code === "ER_DUP_ENTRY"
                    ) {
                      return res.status(409).json({
                        success: false,
                        message:
                          "A user with this email already exists",
                      });
                    }

                    return res.status(500).json({
                      success: false,
                      message: "User update failed",
                      error: updateUserError.message,
                    });
                  });
                }

             
                const updateRoleQuery = ` UPDATE user_roles SET role_id = ? WHERE user_id = ? `;

                connection.query(
                  updateRoleQuery,
                  [Number(role_id), userId],
                  (updateRoleError, updateRoleResult) => {
                    if (updateRoleError) {
                      return connection.rollback(() => {
                        res.status(500).json({
                          success: false,
                          message: "Role update failed",
                          error: updateRoleError.message,
                        });
                      });
                    }

                    if (updateRoleResult.affectedRows === 0) {
                      const insertRoleQuery = `INSERT INTO user_roles (user_id, role_id) VALUES (?, ?) `;

                      connection.query(
                        insertRoleQuery,
                        [userId, Number(role_id)],
                        (insertRoleError) => {
                          if (insertRoleError) {
                            return connection.rollback(() => {
                              res.status(500).json({
                                success: false,
                                message:
                                  "Role assignment failed",
                                error:
                                  insertRoleError.message,
                              });
                            });
                          }

                          commitUpdate();
                        }
                      );
                    } else {
                      commitUpdate();
                    }

                    function commitUpdate() {
                      connection.commit((commitError) => {
                        if (commitError) {
                          return connection.rollback(() => {
                            res.status(500).json({
                              success: false,
                              message:
                                "Transaction commit failed",
                              error: commitError.message,
                            });
                          });
                        }

                        return res.status(200).json({
                          success: true,
                          message:
                            "User updated successfully",
                          data: {
                            user_id: Number(userId),
                            full_name: full_name.trim(),
                            email: email
                              .trim()
                              .toLowerCase(),
                            status: normalizedStatus,
                            role_id: Number(role_id),
                            role_name:
                              roleResult[0].role_name,
                          },
                        });
                      });
                    }
                  }
                );
              }
            );
          }
        );
      }
    );
  });
};



const deleteUser = (req, res) => {
  const userId = req.params.id;

  const query = ` UPDATE users SET status = 'INACTIVE' WHERE user_id = ? `;

  connection.query(query, [userId], (error, result) => {
    if (error) {
      console.error("Delete user error:", error.message);

      return res.status(500).json({
        success: false,
        message: "Failed to deactivate user",
        error: error.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deactivated successfully",
    });
  });
};



const restoreUser = (req, res) => {
  const userId = req.params.id;

  const query = ` UPDATE users SET status = 'ACTIVE' WHERE user_id = ? `;

  connection.query(query, [userId], (error, result) => {
    if (error) {
      console.error("Restore user error:", error.message);

      return res.status(500).json({
        success: false,
        message: "Failed to restore user",
        error: error.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User restored successfully",
    });
  });
};

module.exports = {getUsers, getUserById, getRoles,postUser, updateUser,deleteUser,restoreUser,};