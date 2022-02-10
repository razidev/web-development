const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("welcome");
});

router.get("/signup", function (req, res) {
  res.render("signup");
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
    console.log("data invalid");
    return res.redirect("/signup");
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

  console.log("User is authenticated");
  res.redirect("/admin");
});

router.get("/admin", function (req, res) {
  res.render("admin");
});

router.post("/logout", function (req, res) {});

module.exports = router;
