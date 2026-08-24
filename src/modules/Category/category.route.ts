import express from 'express';
import { CategoryController } from './category.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.post('/', auth('ADMIN'), CategoryController.createCategory);
router.get('/', CategoryController.getAllCategories);

export const CategoryRoutes = router;