const app = require('./app');

const PORT = process.env.PORT || 3500;
const HOSTNAME = process.env.HOSTNAME;

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server running on port http://${HOSTNAME}:${PORT}`);
});