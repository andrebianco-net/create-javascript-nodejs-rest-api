import app from './src/app.js';
import 'dotenv/config';


const { HOSTNAME, PORT, VERSION_API } = process.env;

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server ${VERSION_API} is running at http://${HOSTNAME}:${PORT}`);
  console.log(`Swagger docs: http://${HOSTNAME}:${PORT}/api/${VERSION_API}/swagger`);
});