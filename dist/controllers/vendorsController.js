"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const vendorsService = __importStar(require("../services/vendorsService"));
const errorHandler_1 = require("../utils/errorHandler"); // Import errorHandler
const getAllVendors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vendors = yield vendorsService.getAllVendors();
        res.json(vendors);
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(res, error, 'Error fetching vendors');
    }
});
exports.getAllVendors = getAllVendors;
const getVendorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vendorId = parseInt(req.params.id);
    if (isNaN(vendorId)) {
        (0, errorHandler_1.errorHandler)(res, 'Invalid vendor ID', 'Invalid vendor ID', 400);
        return;
    }
    try {
        const vendor = yield vendorsService.getVendorById(vendorId);
        if (!vendor) {
            (0, errorHandler_1.errorHandler)(res, 'Vendor not found', 'Vendor not found', 404);
            return;
        }
        res.json(vendor);
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(res, error, 'Error fetching vendor');
    }
});
exports.getVendorById = getVendorById;
const createVendor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vendor = yield vendorsService.createVendor(req.body);
        res.json(vendor);
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(res, error, 'Error creating vendor');
    }
});
exports.createVendor = createVendor;
const updateVendor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vendorId = parseInt(req.params.id);
    if (isNaN(vendorId)) {
        (0, errorHandler_1.errorHandler)(res, 'Invalid vendor ID', 'Invalid vendor ID', 400);
        return;
    }
    try {
        const vendor = yield vendorsService.updateVendor(vendorId, req.body);
        if (!vendor) {
            (0, errorHandler_1.errorHandler)(res, 'Vendor not found', 'Vendor not found', 404);
            return;
        }
        res.json(vendor);
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(res, error, 'Error updating vendor');
    }
});
exports.updateVendor = updateVendor;
const deleteVendor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vendorId = parseInt(req.params.id);
    if (isNaN(vendorId)) {
        (0, errorHandler_1.errorHandler)(res, 'Invalid vendor ID', 'Invalid vendor ID', 400);
        return;
    }
    try {
        const deletedVendor = yield vendorsService.deleteVendor(vendorId);
        if (!deletedVendor) {
            (0, errorHandler_1.errorHandler)(res, 'Vendor not found', 'Vendor not found', 404);
            return;
        }
        res.json(deletedVendor);
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(res, error, 'Error deleting vendor');
    }
});
exports.deleteVendor = deleteVendor;
