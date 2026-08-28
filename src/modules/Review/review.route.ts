import express from 'express';
import { ReviewController } from './review.controller';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { ReviewValidation } from './review.validation';

const router = express.Router();

router.post('/', auth('TENANT'),
    validateRequest(ReviewValidation.createReviewSchema),
    ReviewController.createReview
);

export const ReviewRoutes = router;
