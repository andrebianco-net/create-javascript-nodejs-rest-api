exports.getMoviess = async (req, res) => {

    try {
    
        const movies = await movieService.getAlMovies();
    
        res.status(200).json(movies);

    } catch (err) {
      
        res.status(500).json({ message: err.message });

    }

};  