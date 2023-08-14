const authController = require("../controllers/auth");

function authRoutes(fastify, options, done) {
  fastify.post("/register", authController.register);

  fastify.post("/login", authController.login);

  done();
}

module.exports = authRoutes;
