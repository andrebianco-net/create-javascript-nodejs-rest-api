import express from 'express';
import movieController from '../controllers/movieController.js';

const router = express.Router();

router.get('/movies', movieController.getAllMovies);

export default router;