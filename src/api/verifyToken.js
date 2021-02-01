const jwt = require("jsonwebtoken");

module.exports = function async(req, res, next) {
  const token = req.header("Authorization");
  if (!token)
    return res.json({
      code: 401,
      message: "Unauthorized!",
    });

  try {
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verifyToken;
    next();
  } catch (error) {
    next(error);
  }
};
