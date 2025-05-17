import datastore from 'nedb-promises';


const DBConfig = {

    movies: datastore.create(
        { inMemoryOnly: true }
    ),

};

export default DBConfig;
