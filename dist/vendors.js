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
const express_1 = __importDefault(require("express"));
const index_1 = require("./index"); // Import the query function
const router = express_1.default.Router();
// GET /api/vendors
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, index_1.query)('SELECT * FROM vendors', []);
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error fetching vendors:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// POST /api/vendors
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, location, contact } = req.body;
    try {
        const result = yield (0, index_1.query)('INSERT INTO vendors (name, location, contact) VALUES ($1, $2, $3) RETURNING *', [name, location, contact]);
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error('Error creating vendor:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.default = router;
