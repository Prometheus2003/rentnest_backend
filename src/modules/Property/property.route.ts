import express from "express";
import { PropertyController } from './property.controller';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { PropertyValidation } from './property.validation';

const router = express.Router();
router.post('/', auth('LANDLORD', 'ADMIN'), validateRequest(PropertyValidation.createPropertySchema), PropertyController.createProperty);
router.get('/', PropertyController.getAllProperties);
router.get('/:id', PropertyController.getPropertyById);
router.put('/:id', auth('LANDLORD', 'ADMIN'), validateRequest(PropertyValidation.updatePropertySchema), PropertyController.updateProperty);
router.delete('/:id', auth('LANDLORD', 'ADMIN'), PropertyController.deleteProperty);
export const PropertyRoutes = router;