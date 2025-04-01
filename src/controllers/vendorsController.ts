import { Request, Response, RequestHandler } from 'express';
import * as vendorsService from '../services/vendorsService';
import { errorHandler } from '../utils/errorHandler'; // Import errorHandler

export const getAllVendors = async (req: Request, res: Response) => {
    try {
        const vendors = await vendorsService.getAllVendors();
        res.json(vendors);
    } catch (error) {
        errorHandler(res, error, 'Error fetching vendors');
    }
};

export const getVendorById: RequestHandler = async (req, res) => {
    const vendorId = parseInt(req.params.id);
    if (isNaN(vendorId)) {
        errorHandler(res, 'Invalid vendor ID', 'Invalid vendor ID', 400);
        return;
    }
    try {
        const vendor = await vendorsService.getVendorById(vendorId);
        if (!vendor) {
            errorHandler(res, 'Vendor not found', 'Vendor not found', 404);
            return;
        }
        res.json(vendor);
    } catch (error) {
        errorHandler(res, error, 'Error fetching vendor');
    }
};

export const createVendor = async (req: Request, res: Response) => {
    try {
        const vendor = await vendorsService.createVendor(req.body);
        res.json(vendor);
    } catch (error) {
        errorHandler(res, error, 'Error creating vendor');
    }
};

export const updateVendor = async (req: Request, res: Response) => {
    const vendorId = parseInt(req.params.id);
    if (isNaN(vendorId)) {
        errorHandler(res, 'Invalid vendor ID', 'Invalid vendor ID', 400);
        return;
    }
    try {
        const vendor = await vendorsService.updateVendor(vendorId, req.body);
        if (!vendor) {
            errorHandler(res, 'Vendor not found', 'Vendor not found', 404);
            return;
        }
        res.json(vendor);
    } catch (error) {
        errorHandler(res, error, 'Error updating vendor');
    }
};

export const deleteVendor = async (req: Request, res: Response) => {
    const vendorId = parseInt(req.params.id);
    if (isNaN(vendorId)) {
        errorHandler(res, 'Invalid vendor ID', 'Invalid vendor ID', 400);
        return;
    }
    try {
        const deletedVendor = await vendorsService.deleteVendor(vendorId);
        if (!deletedVendor) {
            errorHandler(res, 'Vendor not found', 'Vendor not found', 404);
            return;
        }
        res.json(deletedVendor);
    } catch (error) {
        errorHandler(res, error, 'Error deleting vendor');
    }
};