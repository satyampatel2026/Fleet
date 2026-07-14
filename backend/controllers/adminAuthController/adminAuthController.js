const connection = require("../../models/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// ===============================
// ADMIN LOGIN
// ===============================
const adminLogin = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  const query = `
    SELECT
      u.user_id,
      u.full_name,
      u.email,
      u.password,
      u.status,
      r.role_id,
      r.role_name
    FROM users u
    INNER JOIN user_roles ur
      ON u.user_id = ur.user_id
    INNER JOIN roles r
      ON ur.role_id = r.role_id
    WHERE u.email = ?
    LIMIT 1
  `;

  connection.query(
    query,
    [email.trim().toLowerCase()],
    async (error, result) => {
      if (error) {
        console.error("Admin login error:", error.message);

        return res.status(500).json({
          success: false,
          message: "Login failed",
          error: error.message,
        });
      }

      if (result.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const user = result[0];

      if (user.status !== "ACTIVE") {
        return res.status(403).json({
          success: false,
          message: "Your account is inactive",
        });
      }

      // Sirf ADMIN login kar sake
      if (user.role_name.toUpperCase() !== "ADMIN") {
        return res.status(403).json({
          success: false,
          message: "Access denied. Admin account required",
        });
      }

      const passwordMatched = await bcrypt.compare(
        password,
        user.password
      );

      if (!passwordMatched) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const token = jwt.sign(
        {
          user_id: user.user_id,
          email: user.email,
          role_id: user.role_id,
          role: user.role_name,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN || "1d",
        }
      );

      return res.status(200).json({
        success: true,
        message: "Admin login successful",
        token,
        user: {
          user_id: user.user_id,
          full_name: user.full_name,
          email: user.email,
          role_id: user.role_id,
          role_name: user.role_name,
        },
      });
    }
  );
};

// ===============================
// FORGOT PASSWORD
// ===============================
const forgotPassword = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  const findUserQuery = `
    SELECT
      u.user_id,
      u.full_name,
      u.email,
      u.status,
      r.role_name
    FROM users u
    INNER JOIN user_roles ur
      ON u.user_id = ur.user_id
    INNER JOIN roles r
      ON ur.role_id = r.role_id
    WHERE u.email = ?
    LIMIT 1
  `;

  connection.query(
    findUserQuery,
    [email.trim().toLowerCase()],
    (findError, userResult) => {
      if (findError) {
        return res.status(500).json({
          success: false,
          message: "Unable to process forgot password request",
          error: findError.message,
        });
      }

      if (userResult.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Account not found with this email",
        });
      }

      const user = userResult[0];

      if (user.role_name.toUpperCase() !== "ADMIN") {
        return res.status(403).json({
          success: false,
          message: "Admin account required",
        });
      }

      if (user.status !== "ACTIVE") {
        return res.status(403).json({
          success: false,
          message: "Your account is inactive",
        });
      }

      const resetToken = crypto.randomBytes(32).toString("hex");

      const hashedResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

      const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

      connection.beginTransaction((transactionError) => {
        if (transactionError) {
          return res.status(500).json({
            success: false,
            message: "Unable to start password reset",
          });
        }

        const deleteOldTokensQuery = `
          DELETE FROM password_reset_tokens
          WHERE user_id = ?
        `;

        connection.query(
          deleteOldTokensQuery,
          [user.user_id],
          (deleteError) => {
            if (deleteError) {
              return connection.rollback(() => {
                res.status(500).json({
                  success: false,
                  message: "Unable to remove old reset token",
                  error: deleteError.message,
                });
              });
            }

            const insertTokenQuery = `
              INSERT INTO password_reset_tokens
                (user_id, reset_token, expires_at)
              VALUES (?, ?, ?)
            `;

            connection.query(
              insertTokenQuery,
              [
                user.user_id,
                hashedResetToken,
                expiresAt,
              ],
              async (insertError) => {
                if (insertError) {
                  return connection.rollback(() => {
                    res.status(500).json({
                      success: false,
                      message: "Unable to create reset token",
                      error: insertError.message,
                    });
                  });
                }
               
                const resetLink =
                  `${process.env.FRONTEND_URL}/admin/reset-password/${resetToken}`;
                                  console.log("Generated reset link:", resetLink);

                try {
                  if (
                    process.env.EMAIL_USER &&
                    process.env.EMAIL_PASSWORD
                  ) {
                    const transporter =
                      nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                          user: process.env.EMAIL_USER,
                          pass: process.env.EMAIL_PASSWORD,
                        },
                      });

                    await transporter.sendMail({
                      from: process.env.EMAIL_USER,
                      to: user.email,
                      subject:
                        "Fleet Management Admin Password Reset",
                      html: `
                        <h2>Password Reset Request</h2>

                        <p>Hello ${user.full_name},</p>

                        <p>
                          Click the button below to reset your
                          admin password:
                        </p>

                        <a
                          href="${resetLink}"
                          style="
                            display:inline-block;
                            padding:12px 20px;
                            background:#2563eb;
                            color:#ffffff;
                            text-decoration:none;
                            border-radius:6px;
                          "
                        >
                          Reset Password
                        </a>

                        <p>
                          This link will expire in 15 minutes.
                        </p>
                      `,
                    });
                  }

                  connection.commit((commitError) => {
                    if (commitError) {
                      return connection.rollback(() => {
                        res.status(500).json({
                          success: false,
                          message:
                            "Password reset request failed",
                        });
                      });
                    }

                    return res.status(200).json({
                      success: true,
                      message:
                        "Password reset link sent successfully",

                      // Development ke time ye bhej sakte ho.
                      // Production me resetLink remove kar dena.
                      resetLink:
                        process.env.NODE_ENV !== "production"
                          ? resetLink
                          : undefined,
                    });
                  });
                } catch (mailError) {
                  return connection.rollback(() => {
                    res.status(500).json({
                      success: false,
                      message:
                        "Unable to send password reset email",
                      error: mailError.message,
                    });
                  });
                }
              }
            );
          }
        );
      });
    }
  );
};

// ===============================
// RESET PASSWORD
// ===============================
const resetPassword = (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  if (!token || !password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message:
        "Token, password and confirm password are required",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Password and confirm password do not match",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters",
    });
  }

  const hashedResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const findTokenQuery = `
    SELECT
      reset_id,
      user_id,
      expires_at,
      used
    FROM password_reset_tokens
    WHERE reset_token = ?
      AND used = FALSE
      AND expires_at > NOW()
    LIMIT 1
  `;

  connection.query(
    findTokenQuery,
    [hashedResetToken],
    async (tokenError, tokenResult) => {
      if (tokenError) {
        return res.status(500).json({
          success: false,
          message: "Unable to validate reset token",
          error: tokenError.message,
        });
      }

      if (tokenResult.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Reset link is invalid or expired",
        });
      }

      const resetData = tokenResult[0];

      const hashedPassword = await bcrypt.hash(password, 10);

      connection.beginTransaction((transactionError) => {
        if (transactionError) {
          return res.status(500).json({
            success: false,
            message: "Unable to reset password",
          });
        }

        const updatePasswordQuery = `
          UPDATE users
          SET password = ?
          WHERE user_id = ?
        `;

        connection.query(
          updatePasswordQuery,
          [hashedPassword, resetData.user_id],
          (updateError) => {
            if (updateError) {
              return connection.rollback(() => {
                res.status(500).json({
                  success: false,
                  message: "Password update failed",
                  error: updateError.message,
                });
              });
            }

            const markTokenUsedQuery = `
              UPDATE password_reset_tokens
              SET used = TRUE
              WHERE reset_id = ?
            `;

            connection.query(
              markTokenUsedQuery,
              [resetData.reset_id],
              (markError) => {
                if (markError) {
                  return connection.rollback(() => {
                    res.status(500).json({
                      success: false,
                      message:
                        "Unable to complete password reset",
                      error: markError.message,
                    });
                  });
                }

                connection.commit((commitError) => {
                  if (commitError) {
                    return connection.rollback(() => {
                      res.status(500).json({
                        success: false,
                        message:
                          "Password reset transaction failed",
                      });
                    });
                  }

                  return res.status(200).json({
                    success: true,
                    message:
                      "Password reset successfully. Please login.",
                  });
                });
              }
            );
          }
        );
      });
    }
  );
};

module.exports = {
  adminLogin,
  forgotPassword,
  resetPassword,
};  