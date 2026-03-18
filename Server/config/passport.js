import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:"https://student-management-system-using-mern-in35.onrender.com/api/auth/google/callback",/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const email = profile.emails[0].value;

        let user = await User.findOne({ email });

        if (user) {
          if (!user.googleId) {
            user.googleId = profile.id;
            user.avatar = profile.photos[0].value;
            await user.save();
          }
          return cb(null, user);
        }

        // ✅ Correct role assignment: admin or user
        const isAdmin = email.endsWith("@admincompany.com"); // example rule
        user = await User.create({
          name: profile.displayName,
          email: email,
          googleId: profile.id,
          avatar: profile.photos[0].value,
          role: isAdmin ? "admin" : "user",
          status: "approved",
        });

        return cb(null, user);
      } catch (error) {
        console.error("Google Auth Error:", error);
        return cb(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

export default passport;
