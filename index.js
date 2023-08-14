const fastify = require("fastify")({ logger: true });
const currencyRoutes = require("./routes/currency");
const authRoutes = require("./routes/auth");

fastify.register(currencyRoutes, {
  prefix: "/api",
});

fastify.register(authRoutes);

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
