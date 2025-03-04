const { Users } = require("../models/users");
const { OAuth2Client } = require("google-auth-library");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const client = new OAuth2Client(process.env.CLIENT_ID);

const register = async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  try {
    const existingUser = await Users.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Users.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      user_type: "donor",
      verified: false,
    });

    const token = jwt.sign(
      {
        userId: newUser.user_id,
        email: newUser.email,
        name: newUser.name,
        user_type: newUser.user_type,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log(token);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600 * 1000,
    });

    return res.status(201).json({
      message: "User registered successfully",
      userId: newUser.user_id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error registering user" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(409).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(409).json({ message: "Invalid credentials" });
    }
    console.log(user.user_id);

    const token = jwt.sign(
      {
        userId: user.user_id,
        email: user.email,
        name: user.name,
        user_type: user.user_type,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      userId: user.user_id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error logging in" });
  }
};

const googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID, 
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    let user = await Users.findOne({ where: { email } });

    if (!user) {
      user = await Users.create({
        name,
        email,
        password: "google",
        user_type: "donor",
        verified: false, 
      });
    }

    const tokenData = {
      userId: user.user_id,
      email: user.email,
      name: user.name,
      user_type: user.user_type,
    };

    const jwtToken = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", jwtToken, {
      httpOnly: true,
      maxAge: 3600 * 1000, // 1 hour
    });

    res.status(200).json({
      message: "Login/Registration success",
      userId: user.user_id,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(400).json({ message: "Invalid token", error: error.message });
  }
};

const googleRegister = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    let user = await Users.findOne({ where: { email } });

    if (!user) {
      user = await Users.create({
        name,
        email,
        password: "google",
        user_type: "donor",
        verified: false,
      });

      res.status(201).json({
        message: "Google Registration successful",
        userId: user.user_id,
        user: {
          name: user.name,
          email: user.email,
          profile_picture: user.profile_picture,
        },
      });
    } else {
      res.status(409).json({ message: "User already exists" });
    }
  } catch (error) {
    console.error("Error during Google registration:", error);
    res.status(400).json({ message: "Invalid token", error: error.message });
  }
};

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
  });
  res.json({ message: "Logged out successfully" });
};

module.exports = { register, login, logout, googleLogin, googleRegister };
