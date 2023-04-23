var passport = require("passport");
// Strategies
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
// Used to create, sign, and verify tokens
var jwt = require("jsonwebtoken");
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "somesecretkey";
const payload = {
  //Added timestamp to randomize the token at each server start
  timestamp: new Date().toLocaleString(),
};
const authObj = {
  email: "deenaghalley5@gmail.com",
  password: "P@ssw0rd",
};

const generateToken = function (email, password) {
  try {
    const { email: userEmail, password: userPassword } = authObj;
    if (email === userEmail && password === userPassword) {
      return jwt.sign(
        {
          payload,
        },
        opts.secretOrKey,
        { expiresIn: 3600 }
      );
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    throw error;
  }
  // Generate JSON Web Token
};
// JWT Strategy
const jwtPassport = passport.use(
  new JwtStrategy(
    opts,
    // The done is the callback provided by passport
    (jwt_payload, done) => {
      console.log(jwt_payload);
      if (
        jwt_payload.payload &&
        jwt_payload.payload.timestamp === payload.timestamp
      ) {
        return done(null, true);
      } else {
        return done(null, false);
      }
    }
  )
);
// Verify an incoming user with jwt strategy we just configured above
const verifyToken = passport.authenticate("jwt", { session: false });

module.exports = {
  generateToken,
  jwtPassport,
  verifyToken,
};
