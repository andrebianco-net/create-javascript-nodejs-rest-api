import moviesModel from '../models/movieModel.js';
import importCSV from '../utils/importCSV.js';


const loadData = async (app) => {
    
    app.data = await importCSV.loadData('../../data/movielist.csv');

}

export default { loadData };
