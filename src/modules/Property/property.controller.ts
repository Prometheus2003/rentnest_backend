import { Request, Response, NextFunction } from 'express';
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
const getAllProperties = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await PropertyService.getAllProperties();
        res.status(200).json({
            success: true,
            message: "Properties retrieved successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

export const PropertyController = {
    createProperty,
    getAllProperties,
};