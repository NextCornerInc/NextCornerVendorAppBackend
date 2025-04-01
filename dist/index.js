"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const vendorsRoutes_1 = __importDefault(require("./routes/vendorsRoutes"));
const pg_1 = require("pg");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3005; // Change port to 3005
// Database Connection
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
const query = (text, params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield pool.query(text, params);
        return result;
    }
    catch (error) {
        console.error('Database Query error:', error);
        throw error;
    }
});
exports.query = query;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/vendors', vendorsRoutes_1.default);
// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
app.listen(port, () => {
    console.log(`Vendor app server listening on port ${port}`);
    console.log('DATABASE_URL:', process.env.DATABASE_URL);
});
