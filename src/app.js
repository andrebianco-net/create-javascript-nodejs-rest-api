import express from 'express';
import swaggerUi from 'swagger-ui-express';
import loggerMiddleware from './middlewares/loggerMiddleware.js';
import errorHandler from './middlewares/errorHandler.js';
import moviesService from './services/movieService.js';
import movieRoutes from './routes/movieRoutes.js';
import swaggerSpec from './swagger/swaggerConfig.js';
import 'dotenv/config';


const app = express();
const { VERSION_API } = process.env;
const swaggerDocument = swaggerSpec();

// Body parser
app.use(express.json());

// Routes
app.use(`/api/${VERSION_API}/`, movieRoutes);

// Route to serve swagger.json
app.get(`/api/${VERSION_API}/swagger.json`, (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocument);
});

// Swagger UI
app.use(`/api/${VERSION_API}/swagger`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Global middleware
app.use(loggerMiddleware);
app.use(errorHandler);

// Load data
app.start = async () => {
    await moviesService.importDataCSV();
}

export default app;