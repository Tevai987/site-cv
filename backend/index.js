import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

import articleRoute from './routes/articlesRoute.js';
import authRoute from './routes/authRoute.js';

dotenv.config();

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL);

mongoose.connection.on('error', () => {
    console.log('Erreur lors de la connexion à la base de données');
});

mongoose.connection.on('open', () => {
    console.log('La connexion à la base de données est ouverte');
    
    app.use('/articles', articleRoute);
    app.use('/auth', authRoute);
    
});


app.listen(PORT, () => {
    console.log(`Backend en route sur http://localhost:${PORT}`);
    
});