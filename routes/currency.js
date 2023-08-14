const { getCurrencies, getCurrencyById } = require("../controllers/currency");
const authMiddleware = require("../middlewares/authMiddleware");

function currencyRoutes(fastify, options, done) {
  fastify.get("/currencies", { preHandler: authMiddleware }, getCurrencies);

  fastify.get("/currency/:id", { preHandler: authMiddleware }, getCurrencyById);

  done();
}

module.exports = currencyRoutes;
