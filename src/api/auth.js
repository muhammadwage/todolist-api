const router = require("express").Router();
const monk = require("monk");
const db = monk(process.env.MONGO_URI);
const user = db.get("user");
const { registerValidation, loginValidation } = require("../validation/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
router.post("/register", async (req, res, next) => {
  try {
    const value = await registerValidation(req.body);
    // check existed email/account
    const isEmailExisted = await user.findOne({
      email: value.email,
    });
    if (isEmailExisted)
      return res.json({
        message: "Email already exists!",
      });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(value.password, salt);
    value.password = hashPassword;

    //insert data to collection user in db
    const inserted = await user.insert(value);
    if (inserted)
      return res.json({
        message: "Registered Success!",
      });
  } catch (error) {
    next(error);
  }
});

// Login User
router.get("/login", async (req, res, next) => {
  try {
    //validate request body
    const value = await loginValidation(req.body);

    // check user's email in db
    const selectedUser = await user.findOne({
      email: value.email,
    });
    if (!selectedUser)
      return res.json({
        message: "Account doesn't exists",
      });

    //validate password
    const validatePassword = await bcrypt.compare(
      req.body.password,
      selectedUser.password
    );
    if (!validatePassword)
      return res.json({
        message: "Invalid Password!",
      });

    // generate jwt token
    const token = jwt.sign({ _id: selectedUser._id }, process.env.SECRET_KEY);
    return res.json({
      token: token,
      message: "Logged In!",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
