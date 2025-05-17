import movieService from '../services/movieService.js'


const getAllMovies = async (req, res, next) => {
    
    try {
        
        const movies = await movieService.getAllMovies();
        
        res.status(200).json({
            sucess: true,
            result: movies
        });
        
    } catch (e) {        
        const error = new Error('Erro ao buscar filmes');
        error.status = 500;
        
        next(error);
    }

};

const getAllProducersRanking = async (req, res, next) => {
    
    try {
        
        const movies = await movieService.getAllProducersRanking();
        
        res.status(200).json(movies);
        
    } catch (e) {        
        const error = new Error('Erro ao buscar produtores');
        error.status = 500;
        
        next(error);
    }

};

export default { getAllMovies, getAllProducersRanking };