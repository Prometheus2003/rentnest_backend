import { Request, Response, NextFunction } from "express";
import { CategoryService } from "./category.service";


const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await CategoryService.createCategory(req.body);
        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await CategoryService.getAllCategories();
        res.status(200).json({
            success: true,
            message: "Categories retrieved successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

export const CategoryController = {
    createCategory,
    getAllCategories
};
