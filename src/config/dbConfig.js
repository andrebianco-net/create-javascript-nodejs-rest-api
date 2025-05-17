import datastore from 'nedb-promises';


const movies = datastore.create({
    inMemoryOnly: true
});

export default movies;
