import express from 'express';

import router from './routes.js';

import { connectToDatabase } from './database.js';
const PORT = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'ejs');
app.use(express.json()); // express.json() est un middleware qui analyse le JSON reçu et le rend accessible dans req.body.
app.use('/', router);

// app.listen(PORT, () => {
//     console.log(`Server is running at http://127.0.0.1:${PORT}`)
// });

connectToDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running at http://127.0.0.1:${PORT}`)
        });
    })
    .catch((error) => {
        console.error('Failed to connect to the database:', error);
    })