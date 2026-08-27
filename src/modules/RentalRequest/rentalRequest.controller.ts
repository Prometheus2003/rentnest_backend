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

const getRequestsForLandLord = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await RentalRequestService.getRequestsForLandLord(req.user.id);
        res.status(200).json({
            success: true,
            message: "Rental requests retrieved successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
}

const updateRentalRequestStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await RentalRequestService.updateRequestStatus(
            req.params.id as string,
            req.user.id,
            req.body.status
        );
        res.status(200).json({
            succes: true,
            message: "Rental request updated successfully",
            data: result
        })
    } catch (err) {
        next(err);
    }
}
export const RentalRequestController = {
    createRentalRequest,
    getMyRequests,
    getRequestsForLandLord,
    updateRentalRequestStatus,

};