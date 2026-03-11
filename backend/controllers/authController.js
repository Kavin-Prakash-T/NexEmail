const User = require("../models/User")
const jwt=require("jsonwebtoken")
const sendEmail = require("../utils/emailSender")

const generateAuthToken = function (id) {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_IN });
    return token;
}

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 6 characters" });
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }


        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        const user = await User.create({ username, email, password, otp, otpExpiry });

        try {
            await sendEmail({
                to: email,
                subject: "Your OTP for ColdMail Generator",
                text: `Your OTP  Code is ${otp}. It is valid for only 10 minutes only.`
            })
        } catch (error) {
            console.log({ message: 'Error sending OTP', error: error.message })
        }

        return res.status(201).json({
            message: "User registered successfully", user
        });

    } catch (err) {
        console.error("Registration error:", err);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP are required" })
        }

        const user = await User.findOne({ email }).select("+otp +otpExpiry");

        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        if (user.otp !== otp.toString().trim()) {
            return res.status(400).json({ message: "Invalid OTP" })
        }

        if (user.otpExpiry < Date.now()) {
            return res.status(400).json({ message: "OTP Expired" })
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        const token = generateAuthToken(user._id);
        return res.status(200).json({ token, message: "Email verified successfully" })

    } catch (err) {
        return res.status(500).json({ message: "Error in verifying OTP", error: err.message })
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" })
        }

        const user = await User.findOne({ email }).select("+password +isVerified");

        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        if (!user.isVerified) {
            return res.status(400).json({ message: "User not Verified.Please verify your email first" })
        }
        const isMatch = await user.comparePassword(password)

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const token = generateAuthToken(user._id);
        return res.status(200).json({ message: "Login successful",token, user: { username: user.username, email: user.email } });

    } catch (error) {
        return res.status(500).json({ message: "Error in logging in", error: err.message })
    }
}