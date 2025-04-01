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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVendor = exports.updateVendor = exports.createVendor = exports.getVendorById = exports.getAllVendors = void 0;
const index_1 = require("../index");
const getAllVendors = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, index_1.query)('SELECT * FROM vendors', []);
    return result.rows;
});
exports.getAllVendors = getAllVendors;
const getVendorById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, index_1.query)('SELECT * FROM vendors WHERE id = $1', [id]);
    return result.rows[0] || null;
});
exports.getVendorById = getVendorById;
const createVendor = (vendor) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, location, contact } = vendor;
    const result = yield (0, index_1.query)('INSERT INTO vendors (name, location, contact) VALUES ($1, $2, $3) RETURNING *', [name, location, contact]);
    return result.rows[0];
});
exports.createVendor = createVendor;
const updateVendor = (id, vendor) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, location, contact } = vendor;
    let queryText = 'UPDATE vendors SET ';
    const queryParams = [];
    let paramIndex = 1;
    if (name) {
        queryText += `name = $${paramIndex}, `;
        queryParams.push(name);
        paramIndex++;
    }
    if (location) {
        queryText += `location = $${paramIndex}, `;
        queryParams.push(location);
        paramIndex++;
    }
    if (contact) {
        queryText += `contact = $${paramIndex}, `;
        queryParams.push(contact);
        paramIndex++;
    }
    queryText = queryText.slice(0, -2); // Remove the trailing comma and space
    queryText += ` WHERE id = $${paramIndex} RETURNING *`;
    queryParams.push(id);
    const result = yield (0, index_1.query)(queryText, queryParams);
    return result.rows[0] || null;
});
exports.updateVendor = updateVendor;
const deleteVendor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, index_1.query)('DELETE FROM vendors WHERE id = $1 RETURNING *', [id]);
    return result.rows[0] || null;
});
exports.deleteVendor = deleteVendor;
