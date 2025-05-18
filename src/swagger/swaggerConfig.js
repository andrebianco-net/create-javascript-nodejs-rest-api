import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import 'dotenv/config';


const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
const { SWAGGER_INFO_TITLE, PORT, VERSION_API, HOSTNAME, SWAGGER_INFO_DESCRIPTION } = process.env;

const swaggerSpec = () => {

	const options = {
		definition: {
		openapi: '3.0.0',
			info: {
				title: SWAGGER_INFO_TITLE,
				version: VERSION_API,
				description: SWAGGER_INFO_DESCRIPTION
				+ '\n\n'
				+ `[Download swagger.json](http://${HOSTNAME}:${PORT}/api/${VERSION_API}/swagger.json)`,
			},
			servers: [
				{
					url: `http://${HOSTNAME}:${PORT}/api/${VERSION_API}`,
				},
			],
		},
        apis: [path.join(_dirname, '../routes/movieRoutes.js')],
	};

	return swaggerJSDoc(options);

}

export default swaggerSpec