const { errorHandler } = require("./error");
const jwt = require("jsonwebtoken");

/* 
1. middleware useful for authorization purpose. To be used in future while accessing user
specific information.
*/

const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(403, "unauthorized"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(403, "unauthorized"));
    }
    req.user = user;
    next();
  });
};

module.exports = { verifyUser };
