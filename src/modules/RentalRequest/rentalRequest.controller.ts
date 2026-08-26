import { Request, Response, NextFunction } from 'express';
import { RentalRequestService } from './rentalRequest.service';

const createRentalRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await RentalRequestService.createRentalRequest(req.user.id, req.body);

        res.status(201).json({
            success: true,
            message: "Rental request submitted successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
}

const getMyRequests = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await RentalRequestService.getMyRequests(req.user.id);
        res.status(200).json({
            success: true,
            message: "Rental requests retrieved successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
}

export const RentalRequestController = {
    createRentalRequest,
    getMyRequests,
};