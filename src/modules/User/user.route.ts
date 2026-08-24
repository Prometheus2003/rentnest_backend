import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post('/register', validateRequest(UserValidation.createUserSchema), UserController.registerUser);
router.post('/login', validateRequest(UserValidation.loginSchema), UserController.loginUser);

export const UserRoutes = router;
