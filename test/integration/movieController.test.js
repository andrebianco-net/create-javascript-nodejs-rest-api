import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import moviesService from '../../src/services/movieService.js';
import 'dotenv/config';
import app from '../../src/app.js';


describe(`GET /api/${process.env.VERSION_API}/movies`, () => {

	beforeAll(async () => {
		// Inicializa o banco em memória
		await moviesService.importDataCSV();
	});

	it('Deve retornar uma lista de filmes', async () => {

		const res = await request(app).get(`/api/${process.env.VERSION_API}/movies`);

		expect(res.status).toBe(200);

		expect(res.body).toBeInstanceOf(Object);

		expect(res.body.success).toEqual(true);

		const firstElement = res.body.result[0];
		delete firstElement._id; //remove o id aleatório criado pelo nedb

		expect(firstElement).toEqual({
			producers: "Allan Carr",
			studios: "Associated Film Distribution",
			title: "Can't Stop the Music",
			winner: "yes",
			year: 1980,
		});

	});

});

describe(`GET /api/${process.env.VERSION_API}/producers`, () => {

	beforeAll(async () => {
		// Inicializa o banco em memória
		await moviesService.importDataCSV();
	});

	it('Deve retornar um ranking de produtores', async () => {

		const res = await request(app).get(`/api/${process.env.VERSION_API}/producers`);

		expect(res.status).toBe(200);

		expect(res.body).toBeInstanceOf(Object);

		expect(res.body).toEqual({
			min: [
				{
					producer: 'Allan Carr',
					interval: 0,
					previousWin: 1980,
					followingWin: 1980
				}
			],
			max: [
				{
					producer: 'Renny Harlin',
					interval: 13,
					previousWin: 2001,
					followingWin: 2014
				}
			]
		});

	});

});