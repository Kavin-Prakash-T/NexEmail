const User=require("../models/User")
const sendEmail=require("../utils/emailSender")

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

        const existingUser=await User.findOne({email});

        if(existingUser){
            return res.status(400).json({ message: "User already exists" });
        }
    

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        const user = await User.create({ username, email, password, otp, otpExpiry });
        return res.status(201).json({ message: "User registered successfully", user });

        try{
          await sendEmail({
            to:email,
            subject:"Your OTP for ColdMail Generator",
            text:`Your OTP  Code is ${otp}. It is valid for only 10 minutes only.`
          })
        }catch(error){
            console.log({message:'Error sending OTP',error:error.message})
        }

    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}