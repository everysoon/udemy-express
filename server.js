const port = process.env.PORT || 8800;
const host = process.env.HOST || "127.0.0.1";
const app = require("./app");
const dotenv = require("dotenv");
process.on("uncaughtException", (err) => {
  console.error(err.name, err.message);
  () => process.exit(1);
});
dotenv.config({ path: "./config.env" });

// console.log(process.env);

const server = app.listen(port, host, () => {
  console.log(`App running on port ${port}`);
});
process.on("unhandledRejection", (err) => {
  console.error(err.name, err.message);
  server.close(() => process.exit(1));
});
