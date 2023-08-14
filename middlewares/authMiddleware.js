const jwt = require("jsonwebtoken");
const User = require("../db/models/User");

const authenticateMiddleware = async (request, reply) => {
  const { authorization } = request.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return reply.status(401).send("Unauthorized");
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "your-secret-key");
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return reply.status(401).send("Unauthorized");
    }

    request.user = user;
  } catch (error) {
    return reply.status(401).send("Unauthorized");
  }
};

module.exports = authenticateMiddleware;
