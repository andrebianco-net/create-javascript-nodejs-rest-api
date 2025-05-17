import express from 'express';
import movieController from '../controllers/movieController.js';

const router = express.Router();

router.get('/movies', movieController.getAllMovies);

router.get('/producers', movieController.getAllProducersRanking);

export default router;