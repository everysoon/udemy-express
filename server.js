const port = process.env.PORT || 3000;
const host = process.env.HOST || '127.0.0.1';
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

console.log(process.env);

if (process.env.NODE_ENV === 'dev') {
}
app.listen(port, host, () => {
  console.log(`App running on port ${port}`);
});
