const express = require("express");
const { signup, signin } = require("../controllers/authController");
const { OAuth2Client } = require("google-auth-library");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Initialize Google OAuth2 Client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// POST route for Google login
router.post("/google", async (req, res) => {
  const { token } = req.body;

  try {
    // Verify the token using the Google client
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, // Verify against your Google Client ID
    });
    const payload = ticket.getPayload();

    // Find or create the user in the database
    let user = await User.findOne({ email: payload.email });
    if (!user) {
      user = new User({
        email: payload.email,
        name: payload.name,
        avatar: payload.picture,
        googleId: payload.sub,
      });
      await user.save();
    }

    // Generate JWT token
    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Respond with the JWT token and user data
    res.json({ token: jwtToken, user });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).send("Google authentication failed");
  }
});

// POST route for user signup
router.post("/signup", signup);

// POST route for user signin
router.post("/signin", signin);

module.exports = router;
