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
const getPropertyById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await PropertyService.getPropertyById(req.params.id as string);
        res.status(200).json({
            success: true,
            message: "Property retrieved successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};
const updateProperty = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await PropertyService.updateProperty(req.params.id as string, req.body);
        res.status(200).json({
            success: true,
            message: "Property updated successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};
const deleteProperty = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await PropertyService.deleteProperty(req.params.id as string);
        res.status(200).json({
            success: true,
            message: "Property deleted successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

export const PropertyController = {
    createProperty,
    getAllProperties,
    getPropertyById,
    updateProperty,
    deleteProperty
};