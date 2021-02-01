const router = require("express").Router();
// const monk = require("monk");
// const db = monk(process.env.MONGO_URI);
// const user = db.get("user");
const verify = require("./verifyToken");

// create task
router.post("/", verify, (req, res) => {
  res.json({
    message: "You're In",
  });
  // try {
  // } catch (error) {
  //   next(error);
  // }
});

module.exports = router;
