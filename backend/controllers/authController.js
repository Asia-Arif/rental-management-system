const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check all fields
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // Check role
        if (!["owner", "tenant"].includes(role)) {
            return res.status(400).json({
                message: "Invalid role",
            });
        }

        // Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.error("Register error:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};

// Login
const loginUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Check fields
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Email, password and role are required",
            });
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        // Check role
        if (user.role !== role) {
            return res.status(401).json({
                message: "Invalid role for this account",
            });
        }

        // Check password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
};