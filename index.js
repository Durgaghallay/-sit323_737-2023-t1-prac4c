const express = require("express");

const { generateToken, verifyToken } = require("./authentication");
const { logger } = require("./logger");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

// Generate Token
app.post("/generateToken", (req, res) => {
  try {
    console.log("adsf", req.body);
    const { email, password } = req.body;

    // Create a token
    var token = generateToken(email, password);
    console.log("token", token);
    // Response
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      token: token,
    });
  } catch (error) {
    logger.log({
      level: "error",
      message: `Authentication Failure `,
      timestamp: new Date().toLocaleString(),
    });
    console.log(error);
    res.status(500).json({ statuscocde: 500, msg: error.message });
  }
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
