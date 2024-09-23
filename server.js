const port = process.env.PORT || 8800;
const host = process.env.HOST || "127.0.0.1";
const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

console.log(process.env);

app.listen(port, host, () => {
  console.log(`App running on port ${port}`);
});
