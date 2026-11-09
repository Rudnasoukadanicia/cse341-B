import 'dotenv/config';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

let db;

export const connectToDatabase = async () => {
    try {
        await client.connect();

        db = client.db('cse341');

        console.log('Connected to MongoDB!');

        return db;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};

export const getDatabase = () => db;