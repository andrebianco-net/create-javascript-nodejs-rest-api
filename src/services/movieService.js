import moviesModel from '../models/movieModel.js';


const MoviesService = {

    async importDataCSV() {
        await moviesModel.loadData();
    },

    async getAllMovies() {
        return await moviesModel.getAllMovies();
    },

    async getAllProducersRanking() {
        
        // Retorna o produtor com o menor e o maior intervalo entre vitórias
        
        try {
            // Busca todos os filmes no banco/modelo
            const allMovies = await moviesModel.getAllMovies();

            // Objeto para armazenar os anos dos filmes agrupados por produtor
            const producerMovies = {};

            // Percorre cada filme para extrair os produtores
            allMovies.forEach(movie => {

                // Divide os produtores separados por vírgula e remove espaços extras
                const producers = movie.producers.split(',').map(p => p.trim());

                // Para cada produtor listado, armazena o ano do filme
                producers.forEach(producer => {

                    if (!producerMovies[producer]) {
                        producerMovies[producer] = []; // Inicializa array se for o primeiro filme do produtor
                    }

                    producerMovies[producer].push(movie.year); // Adiciona o ano do filme ao produtor

                });
            });

            // Filtra os produtores que têm mais de um filme e ordena os anos
            const validProducers = Object.entries(producerMovies)
                .filter(([_, years]) => years.length > 1) // [chave, valor] Mantém apenas os que têm mais de um filme
                .map(([producer, years]) => ({
                    producer,
                    years: years.sort((a, b) => a - b) // Ordena os anos em ordem crescente
                }));

            // Para cada produtor válido, calcula os intervalos entre anos consecutivos
            const intervals = validProducers.map(entry => {
                
                const diffs = [];

                for (let i = 1; i < entry.years.length; i++) {
                    // Calcula a diferença entre o ano atual e o anterior
                    diffs.push(entry.years[i] - entry.years[i - 1]);
                }

                return {
                    producer: entry.producer,
                    interval: Math.min(...diffs), // Menor intervalo entre dois anos
                    maxInterval: Math.max(...diffs), // Maior intervalo entre dois anos
                    years: entry.years, // Lista de anos
                    intervals: diffs // Lista de intervalos entre anos consecutivos
                };

            });

            // Reduz a lista para encontrar o produtor com o menor intervalo
            const minEntry = intervals.reduce((min, current) =>
                current.interval < min.interval ? current : min
            );

            // Reduz a lista para encontrar o produtor com o maior intervalo
            const maxEntry = intervals.reduce((max, current) =>
                current.maxInterval > max.maxInterval ? current : max
            );

            // Identifica o índice do menor intervalo na lista de intervalos
            const minIndex = minEntry.intervals.indexOf(minEntry.interval);

            // Prepara o resultado do produtor com o menor intervalo
            const min = [{
                producer: minEntry.producer,
                interval: minEntry.interval,
                previousWin: minEntry.years[minIndex], // Ano da vitória anterior
                followingWin: minEntry.years[minIndex + 1] // Ano da vitória seguinte
            }];

            // Identifica o índice do maior intervalo na lista de intervalos
            const maxIndex = maxEntry.intervals.indexOf(maxEntry.maxInterval);
            
            // Prepara o resultado do produtor com o maior intervalo
            const max = [{
                producer: maxEntry.producer,
                interval: maxEntry.maxInterval,
                previousWin: maxEntry.years[maxIndex], // Ano da vitória anterior
                followingWin: maxEntry.years[maxIndex + 1] // Ano da vitória seguinte
            }];

            // Retorna os dois resultados no formato especificado
            return { min, max };

        } catch (err) {
            throw err;
        }

    }

}

export default {
    importDataCSV: MoviesService.importDataCSV,
    getAllMovies: MoviesService.getAllMovies,
    getAllProducersRanking: MoviesService.getAllProducersRanking
};
