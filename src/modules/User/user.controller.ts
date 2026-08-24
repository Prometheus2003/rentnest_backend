import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await UserService.registerUser(req.body);
        const { password, ...userwithoutPassword } = result;
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: userwithoutPassword,
        });
    } catch (err) {
        next(err);
    }
}

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await UserService.loginUser(req.body);
        const { password, ...userwithoutPassword } = result.user;
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: {
                token: result.token,
                user: userwithoutPassword,
            },
        });
    } catch (err) {
        next(err);
    }
}

export const UserController = {
    registerUser,
    loginUser,
}; 