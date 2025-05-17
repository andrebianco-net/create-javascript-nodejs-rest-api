import express from 'express';
import loggerMiddleware from './middlewares/loggerMiddleware.js';
import moviesService from './services/movieService.js';
import movieRoutes from './routes/movieRoutes.js';


const app = express();

// Global middleware
app.use(loggerMiddleware);

// Body parser
app.use(express.json());

// Routes
const { VERSION_API } = process.env;
app.use(`/api/${VERSION_API}/movies`, movieRoutes);

export default app;