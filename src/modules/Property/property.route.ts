import express from "express";
import { PropertyController } from './property.controller';
import auth from '../../middleware/auth';

const router = express.Router();
router.post('/', auth('LANDLORD', 'ADMIN'), PropertyController.createProperty);

export const PropertyRoutes = router;