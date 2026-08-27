import express from 'express';
import { RentalRequestController } from './rentalRequest.controller';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { RentalRequestValidation } from './rentalRequest.validation';

const router = express.Router();

router.post('/', auth('TENANT'), validateRequest(RentalRequestValidation.createRequestSchema), RentalRequestController.createRentalRequest);

router.get('/my-requsets', auth('TENANT'), RentalRequestController.getMyRequests);

router.get('/landlord-request', auth('LANDLORD'),
    RentalRequestController.getRequestsForLandLord)

router.put('/:id/status', auth('LANDLORD'), RentalRequestController.updateRentalRequestStatus);

export const RentalRequestRoutes = router;