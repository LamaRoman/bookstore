import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "./database/userSchema";

// Configure local strategy

passport.use(
  new LocalStrategy((username, password, done) => {
    const user = User.findOne(
      {
        username: username,
      },
      (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }

        if ((user.password = password)) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password" });
        }
      }
    );
  })
);

// // Serialize user
// passport.serializeUser((user, done) => done(null, user.id));

// // Deserialize user

// passport.deserializeUser((id, done) => {
//   const user = User.findOne({ id: id }, (err, user) => {
//     if (err) {
//       return done(err);
//     }
//     done(null, user);
//   });
// });
