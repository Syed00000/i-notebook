const jwt = require("jsonwebtoken");
const JWT_SECRET = "syedimranisagoodb$oy";

const fetchuser = (req, res, next) => {
  // Get the user from the JWT token
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({
      error: "Access denied, please authenticate using a valid token",
    });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user; // Corrected: Ensure to set the user property correctly
    next();
  } catch (error) {
    res.status(401).json({
      error: "Access denied, please authenticate using a valid token",
    });
  }
};

module.exports = fetchuser;
