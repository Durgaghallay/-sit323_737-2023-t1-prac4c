const express = require("express");
const res = require("express/lib/response");
const winston = require("winston");
var passport = require("passport");
// Strategies
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
// Used to create, sign, and verify tokens
var jwt = require("jsonwebtoken");
const app = express();
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "somesecretkey";
const payload = {
  //Added timestamp to randomize the token at each server start
  timestamp: new Date().toLocaleString(),
};
const generateToken = function () {
  // Generate JSON Web Token
  return jwt.sign(
    {
      payload,
    },
    opts.secretOrKey,
    { expiresIn: 3600 }
  );
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
const add = (n1, n2) => {
  return n1 + n2;
};
const subtract = (n1, n2) => {
  return n1 - n2;
};
const multiply = (n1, n2) => {
  return n1 * n2;
};
const divide = (n1, n2) => {
  return n1 / n2;
};
const logger = winston.createLogger({
  level: "info",

  format: winston.format.json(),

  defaultMeta: { service: "calculator-microservice" },

  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),

    new winston.transports.File({ filename: "logs/error.log", level: "error" }),

    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});
// Generate Token
app.post("/generateToken", (req, res) => {
  // Create a token
  var token = generateToken();
  // Response
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({
    token: token,
  });
});
app.get("/add", verifyToken, (req, res) => {
  logger.log({
    level: "info",
    message: `New add operation requested: ${req.query.n1}+${req.query.n2}`,
    timestamp: new Date().toLocaleString(),
  });
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1)) {
      throw new Error("n1 incorrectly defined");
    }
    if (isNaN(n2)) {
      throw new Error("n2 incorrectly defined");
    }
    if (n1 === NaN || n2 === NaN) {
      console.log();
      throw new Error("Parsing Error");
    }
    const result = add(n1, n2);
    res.status(200).json({ statuscocde: 200, data: result });
  } catch (error) {
    logger.log({
      level: "error",
      message: `Add operation error. Error Message ${error.message} `,
      timestamp: new Date().toLocaleString(),
    });
    console.log(error);
    res.status(500).json({ statuscocde: 500, msg: error.message });
  }
});
app.get("/subtract", verifyToken, (req, res) => {
  logger.log({
    level: "info",
    message: `New subtract operation requested: ${req.query.n1}-${req.query.n2}`,
    timestamp: new Date().toLocaleString(),
  });
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1)) {
      throw new Error("n1 incorrectly defined");
    }
    if (isNaN(n2)) {
      throw new Error("n2 incorrectly defined");
    }
    if (n1 === NaN || n2 === NaN) {
      console.log();
      throw new Error("Parsing Error");
    }
    const result = subtract(n1, n2);
    res.status(200).json({ statuscocde: 200, data: result });
  } catch (error) {
    logger.log({
      level: "error",
      message: `Subtract operation error. Error Message ${error.message} `,
      timestamp: new Date().toLocaleString(),
    });
    console.log(error);
    res.status(500).json({ statuscocde: 500, msg: error.message });
  }
});
app.get("/multiply", verifyToken, (req, res) => {
  logger.log({
    level: "info",
    message: `New multiply operation requested: ${req.query.n1}*${req.query.n2}`,
    timestamp: new Date().toLocaleString(),
  });
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1)) {
      throw new Error("n1 incorrectly defined");
    }
    if (isNaN(n2)) {
      throw new Error("n2 incorrectly defined");
    }
    if (n1 === NaN || n2 === NaN) {
      console.log();
      throw new Error("Parsing Error");
    }
    const result = multiply(n1, n2);
    res.status(200).json({ statuscocde: 200, data: result });
  } catch (error) {
    logger.log({
      level: "error",
      message: `Multiply operation error. Error Message ${error.message} `,
      timestamp: new Date().toLocaleString(),
    });
    console.log(error);
    res.status(500).json({ statuscocde: 500, msg: error.message });
  }
});
app.get("/divide", verifyToken, (req, res) => {
  logger.log({
    level: "info",
    message: `New divide operation requested: ${req.query.n1}/${req.query.n2}`,
    timestamp: new Date().toLocaleString(),
  });
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1)) {
      throw new Error("n1 incorrectly defined");
    }
    if (isNaN(n2)) {
      throw new Error("n2 incorrectly defined");
    }
    if (n1 === NaN || n2 === NaN) {
      console.log();
      throw new Error("Parsing Error");
    }
    const result = divide(n1, n2);
    res.status(200).json({ statuscocde: 200, data: result });
  } catch (error) {
    logger.log({
      level: "error",
      message: `Divide operation error. Error Message ${error.message} `,
      timestamp: new Date().toLocaleString(),
    });
    console.log(error);
    res.status(500).json({ statuscocde: 500, msg: error.message });
  }
});
const port = 3040;
app.listen(port, () => {
  console.log("hello i'm listening to port " + port);
});
