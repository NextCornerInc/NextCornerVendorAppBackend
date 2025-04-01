// src/utils/errorHandler.ts

import { Response } from 'express';

export const errorHandler = (res: Response, error: any, message: string = 'Internal server error', statusCode: number = 500) => {
    console.error(message, error);
    res.status(statusCode).json({ error: message });
};