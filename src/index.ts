import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import vendorsRoutes from './routes/vendorsRoutes';
import { Pool } from 'pg';

dotenv.config();

const app = express();
const port = 3005; // Change port to 3005

// Database Connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const query = async (text: string, params: any[]) => {
    try {
        const result = await pool.query(text, params);
        return result;
    } catch (error) {
        console.error('Database Query error:', error);
        throw error;
    }
};

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/vendors', vendorsRoutes);

// Error Handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Vendor app server listening on port ${port}`);
    console.log('DATABASE_URL:', process.env.DATABASE_URL);
});