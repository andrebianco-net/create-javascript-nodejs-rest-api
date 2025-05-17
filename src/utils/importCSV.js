import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import csv from 'csv-parser';


const loadData = async (filePath) => {

    const results = [];

    // Pega o diretório atual do módulo
    const _filename = fileURLToPath(import.meta.url);
    const _dirname = path.dirname(_filename);

    const csvPath = path.resolve(_dirname, filePath);

    // Read CSV
    return new Promise((resolve, reject) => {
        fs.createReadStream(csvPath)
            .pipe(csv({ separator: ';' }))
            .on('data', (row) => { 
                
                row.year = parseInt(row.year);
                
                if (row.winner == '') {
                    row.winner = 'no';
                }

                results.push(row) 

            })
            .on('end', () => resolve(results))
            .on('error', (err) => reject(err));
        });

}

export default { loadData };