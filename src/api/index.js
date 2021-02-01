const express = require("express");

const faqs = require("./faq");
const auth = require("./auth");
const task = require("./task");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/faqs", faqs);
router.use("/user", auth);
router.use("/task", task);

module.exports = router;
