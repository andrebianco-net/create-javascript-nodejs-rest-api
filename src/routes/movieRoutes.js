import express from 'express';
import movieController from '../controllers/movieController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Movies
 *     description: Operações relacionadas aos Filmes disponíveis em nossa base de dados.
 *
 * /movies:
 *   get:
 *     tags:
 *       - Movies
 *     summary: Retorna todos os Filmes cadastrados.
 *     responses:
 *       200:
 *         description: Success
 */

router.get('/movies', movieController.getAllMovies);

/**
 * @swagger
 * tags:
 *   - name: Producers
 *     description: Operações relacionadas ao Ranking dos Produtores dos filmes disponíveis.
 *
 * /producers:
 *   get:
 *     tags:
 *       - Producers
 *     summary: Retorna o Produtor com maior intervalo entre dois prêmios consecutivos, e o que obteve dois prêmios mais rápido.
 *     responses:
 *       200:
 *         description: Success
 */

router.get('/producers', movieController.getAllProducersRanking);

export default router;