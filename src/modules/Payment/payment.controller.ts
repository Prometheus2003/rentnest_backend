import { Request, Response, NextFunction } from "express";
import { paymentService } from "./payment.service";

const processPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await paymentService.processPayment(req.body.rentalRequestId, req.user.id);

        res.status(200).json({
            success: true,
            message: "Payment processed successfully",
            data: result
        })
    } catch (err) {
        next(err);
    }
}
export const PaymentController = {
    processPayment
}