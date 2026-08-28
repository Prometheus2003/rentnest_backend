import express from 'express';
import { AdminController } from './admin.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.get('/users', auth('ADMIN'), AdminController.getAllUsers);

router.patch('/users/:id', auth('ADMIN'), AdminController.updateUserStatus);

export const AdminRoutes = router;
