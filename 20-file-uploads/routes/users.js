const express = require("express");
const multer = require("multer");
const db = require("../data/database");

const storageConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images-store");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storageConfig });
const router = express.Router();

router.get("/", async function (req, res) {
  const users = await db.getDb().collection("users").find().toArray();
  res.render("profiles", { users });
});

router.get("/new-user", function (req, res) {
  res.render("new-user");
});

router.post("/profiles", upload.single("imageUser"), async (req, res) => {
  const uploadedImageFile = req.file;
  const userData = req.body;

  await db.getDb().collection("users").insertOne({
    name: userData.username,
    path: uploadedImageFile.path,
  });

  res.redirect("/");
});

module.exports = router;
