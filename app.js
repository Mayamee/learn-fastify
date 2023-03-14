const fastify = require("fastify")({
  logger: true,
});
const PORT = process.env.PORT || 5000;
fastify.register(require("@fastify/swagger"), {
  exposeRoute: true,
  routePrefix: "/docs",
  swagger: {
    info: {
      title: "fastify-api",
    },
  },
});
fastify.register(require("./routes/Items"));
const main = async () => {
  try {
    fastify.listen({
      port: PORT,
      host: "0.0.0.0",
    });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};
main();
