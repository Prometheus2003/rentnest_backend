import express, { Request, Response, NextFunction } from 'express'
import prisma from '../../utils/prisma'
import auth from '../../middleware/auth'

const router = express.Router()

router.get('/me', auth('TENANT', 'LANDLORD', 'ADMIN'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: { id: true, name: true, email: true, role: true, profileImage: true, bio: true, contactNumber: true }
        })
        res.status(200).json({
            success: true,
            message: "Profile retrived successfully",
            data: user
        })
    } catch (err) {
        next(err)
    }
})

router.put('/me', auth('TENANT', 'LANDLORD', 'ADMIN'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updateUser = await prisma.user.update({
            where: { id: req.user.id },
            data: req.body,
            select: { id: true, name: true, email: true, role: true, profileImage: true, bio: true, contactNumber: true }
        })
        res.status(200).json({
            success: true,
            message: "Profile updated succesfully",
            data: updateUser
        })
    } catch (err) {
        next(err)
    }
})

export const ProfileRoutes = router;
