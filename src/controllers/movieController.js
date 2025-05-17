import movieService from '../services/movieService.js'


const getAllMovies = async (req, res) => {

    try {
   
        
        

        res.status(200).json(movies);

    } catch (err) {
      
        res.status(500).json({ message: err.message });

    }

};  

export default { getAllMovies };