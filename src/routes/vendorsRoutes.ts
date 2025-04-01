import express from 'express';
import * as vendorsController from '../controllers/vendorsController';

const router = express.Router();

router.get('/', vendorsController.getAllVendors);
router.get('/:id', vendorsController.getVendorById);
router.post('/', vendorsController.createVendor); // Use validated controller
router.put('/:id', vendorsController.updateVendor); // Use validated controller
router.delete('/:id', vendorsController.deleteVendor);

export default router;