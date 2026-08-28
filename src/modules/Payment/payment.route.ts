import express from 'express';
import { PaymentController } from './payment.controller';
import auth from '../../middleware/auth';

const router = express.Router()
router.post('/pay', auth('TENANT'), PaymentController.processPayment);

export const PaymentRoutes = router;