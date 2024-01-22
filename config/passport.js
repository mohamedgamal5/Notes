const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/User");

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.use(
  "local-signin",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      await User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            return done(
              null,
              false,
              req.flash("signinError", "This user not found")
            );
          }
          if (!user.comparePassword(password)) {
            return done(
              null,
              false,
              req.flash("signinError", "Wrong password")
            );
          }
          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);

passport.use(
  "local-signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      await User.findOne({ email: email })
        .then(async (user) => {
          if (user) {
            return done(
              null,
              false,
              req.flash("signupError", "This E-mail already exist")
            );
          }

          const newUser = new User({
            email: email,
            password: new User().hashPassword(password),
            name: req.body.name,
          });
          console.log(`new User>${newUser}`);
          await newUser
            .save()
            .then((doc) => {
              console.log(`doc>${doc}`);
              return done(null, newUser);
            })
            .catch((err) => {
              console.error(err);
              return done(err);
            });
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);
