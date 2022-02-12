const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("welcome");
});

router.get("/signup", function (req, res) {
  let sessionInputData = req.session.inputData;
  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: '',
      confirmEmail: '',
      password: ''
    };
  }

  req.session.inputData = null;
  res.render("signup", { inputData: sessionInputData });
});

router.get("/login", function (req, res) {
  res.render("login");
});

router.post("/signup", async function (req, res) {
  const userData = req.body;
  const email = userData.email;
  const confirmEmail = userData["confirm-email"];
  const password = userData.password;
  const hashedPassword = await bcrypt.hash(password, 12);

  if (
    !email ||
    !confirmEmail ||
    !password ||
    password.trim() < 6 ||
    email != confirmEmail ||
    !email.includes("@")
  ) {
    
    req.session.inputData = {
      hasError:  true,
      message: "Invalid data - please check your data",
      email,
      confirmEmail,
      password
    };

    req.session.save(function() {
      res.redirect("/signup");
    });
    return;
  }

  const existingUser = await db.getDb().collection("users").findOne({ email });
  if (existingUser) {
    console.log("user is exist");
    return res.redirect("/signup");
  }

  const user = {
    email,
    password: hashedPassword,
  };

  await db.getDb().collection("users").insertOne(user);

  res.redirect("/login");
});

router.post("/login", async function (req, res) {
  const userData = req.body;
  const email = userData.email;
  const password = userData.password;

  const existingUser = await db.getDb().collection("users").findOne({ email });

  if (!existingUser) {
    console.log("Could not log in!");
    return res.redirect("/login");
  }

  const passwordEqual = await bcrypt.compare(password, existingUser.password);
  if (!passwordEqual) {
    console.log("Could not log in! - password arent equal");
    return res.redirect("/login");
  }

  req.session.user = { id: existingUser._id, email: existingUser.email };
  req.session.isAuthenticated = true;
  req.session.save(function() {
    res.redirect("/admin");
  });
});

router.get("/admin", function (req, res) {
  if (!req.session.isAuthenticated) {
    return res.status(401).render('401');
  }
  res.render("admin");
});

router.post("/logout", function (req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect("/");
});

module.exports = router;
