// Import necessary modules
import express from "express";
import passport from "passport";
import User from "../database/userSchema.js";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";

// Create an instance of Express router
const router = express.Router();
router.use(express.json());

// Initialize and use express-session middleware
router.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport and use its session middleware
router.use(passport.initialize());
router.use(passport.session());

// Configure Passport local strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username });
    if (!user) {
      console.log("User not found");
      return;
    }

    if (user.password !== password) {
      console.log("Invalid password");
      return;
    } else {
      console.log("You are logged in...");
      done(null, user);
    }
  })
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  console.log("serialized user", user.id);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  User.findById(id, function (err, user) {
    done(null, user);
  });
});

// Define the login route
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({ message: "Login successful" });
});

// Define the registration route
router.post("/", async (req, res) => {
  console.log(req.body);

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const user = { username, email, password };

  console.log("Got the user...");
  await User.create(user);

  // Redirect after successful registration
  res.redirect("/login");
});

// Export the router
export default router;
