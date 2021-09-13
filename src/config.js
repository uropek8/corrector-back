const NODE_ENV = process.env.NODE_ENV || "development";

const config = {
  environment: NODE_ENV,
  server: {
    port: process.env.SERVER_PORT || 3000,
  },
};

module.exports = config;
