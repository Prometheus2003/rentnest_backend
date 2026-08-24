import express from "express";
import { PropertyController } from './property.controller';
import auth from '../../middleware/auth';

const router = express.Router();
router.post('/', auth('LANDLORD', 'ADMIN'), PropertyController.createProperty);
router.get('/', PropertyController.getAllProperties);
export const PropertyRoutes = router;