import movieService from '../services/movieService.js'


const getAllMovies = (req, res, next) => {
    
    try {

        const error = new Error('Erro ao buscar filmes');
        error.status = 500;
        throw error;

        
        res.status(200).json({
            sucess: true,
            result: {}
        })

    } catch (err) {
        next(err);
    }

};

export default { getAllMovies };