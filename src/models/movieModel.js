import importCSV from '../utils/importCSV.js';
import movies from '../config/dbConfig.js';


const MoviesModel = {

    async loadData() {
        await movies.remove({ multi: true });
        const data = await importCSV.loadData('../../data/movielist.csv');        
        await movies.insert(data);
    },
    
    async getAllMovies() {
        return await movies.find({ }).sort({ year: 1, title: 1 });
    }

};

export default MoviesModel;
