import express from 'express'

import router from './routes.js'
const PORT = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'ejs');
app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`)
});