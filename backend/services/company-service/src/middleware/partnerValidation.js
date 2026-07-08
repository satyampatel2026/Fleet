const partnerValidation = (req, res, next) => {

    const {
        name,
        email,
        phone,
        password,
        company_name,
        address,
        status
    } = req.body;

    if (!company_name || company_name.trim() === "") {
        return res.status(400).json({
            message: "Company name is required"
        });
    }

    if (!name || name.trim() === "") {
        return res.status(400).json({
            message: "Name is required"
        });
    }

    if (!email || email.trim() === "") {
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

    if (!phone || phone.trim() === "") {
        return res.status(400).json({
            message: "Phone is required"
        });
    }

    if (!/^[0-9]{10,15}$/.test(phone)) {
        return res.status(400).json({
            message: "Phone must be between 10 and 15 digits"
        });
    }

    if (!password || password.length < 6) {
        return res.status(400).json({
            message: "Password must be at least 6 characters"
        });
    }

    if (status && !["active", "inactive"].includes(status)) {
        return res.status(400).json({
            message: "Status must be active or inactive"
        });
    }

    next();
};

module.exports = partnerValidation;