const jwt = require("jsonwebtoken");

const JWT_SECRET = "my-lab-key";

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization; // "Bearer askhjdakjsdha.asjkhdakhjsd.ahsdkljahsd"

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Missing or invalid authentication header!" });
  }

  const token = authHeader.split(" ")[1]; // ["Bearer", "askhjdakjsdha.asjkhdakhjsd.ahsdkljahsd"]

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token!" });
  }
}

module.exports = { authMiddleware, JWT_SECRET };
