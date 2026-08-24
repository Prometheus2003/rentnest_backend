import {Request, Response, NextFunction} from 'express';
import { PropertyService } from './property.service';

const createProperty = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const propertyData = {
            ...req.body,
            landlordId: req.user.id,
        };
        const result = await PropertyService.createProperty(propertyData);
        res.status(201).json({
            success: true,
            message: "Property created successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const PropertyController = {
    createProperty,
};