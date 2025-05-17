import express from 'express';
import loggerMiddleware from './middlewares/loggerMiddleware.js';
import errorHandler from './middlewares/errorHandler.js';
import moviesService from './services/movieService.js';
import movieRoutes from './routes/movieRoutes.js';
import 'dotenv/config';


const app = express();

// Routes
app.use(`/api/${process.env.VERSION_API}/`, movieRoutes);

// Global middleware
app.use(loggerMiddleware);
app.use(errorHandler);

// Body parser
app.use(express.json());

export default app;