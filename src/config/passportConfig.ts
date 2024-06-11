import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User";
import cookieSession from "cookie-session";

const initializeAuth = (app: any) => {
  app.use(
    cookieSession({
      name: "google-auth-session",
      keys: ["key1", "key2"],
      maxAge: 24 * 60 * 60 * 3600,
    })
  );
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: "/api/auth/google/callback",
        scope: ["profile", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(accessToken);
          console.log(refreshToken);

          let user = await User.findOne({ googleId: profile.id });
          if (!user) {
            user = await new User({
              googleId: profile.id,
              username: profile.displayName,
              email: profile.emails?.[0].value,
            }).save();
          }
          done(null, user);
        } catch (err) {
          done(err, null!);
        }
      }
    )
  );

  app.use(passport.initialize());
};

export default initializeAuth;
