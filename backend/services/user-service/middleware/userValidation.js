const userValidation = (req, res, next) => {

    const {
        role,
        name,
        email,
        phone,
        password_hash,
        status  
    } = req.body;

    // Role
    if (!role) {
        return res.status(400).json({
            message: "Role is required"
        });
    }

    // Name
    if (!name || name.trim().length < 3 || name.trim().length > 100) {
        return res.status(400).json({
            message: "Name must be between 3 and 100 characters"
        });
    }

    // Email
    if (!email) {
        return res.status(400).json({
            message: "Email is required"
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: "Invalid email format"
        });
    }

    // Phone
    if (!phone) {
        return res.status(400).json({
            message: "Phone is required"
        });
    }

    if (!/^[0-9]{10,15}$/.test(phone)) {
        return res.status(400).json({
            message: "Phone must contain 10 to 15 digits"
        });
    }

    // Password
if (req.method === "POST") {
    if (!password_hash || password_hash.length < 6) {
        return res.status(400).json({
            message: "Password must be at least 6 characters"
        });
    }
}

    // Status
    if (status && !["active", "inactive"].includes(status)) {
        return res.status(400).json({
            message: "Status must be 'active' or 'inactive'"
        });
    }

    next();
};

module.exports = userValidation;