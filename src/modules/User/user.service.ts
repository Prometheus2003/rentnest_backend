import prisma from '../../utils/prisma';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';
const registerUser = async (userData: any) => {
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    const dataToSave = { ...userData, password: hashedPassword };
    const result = await prisma.user.create({
        data: dataToSave,
    });
    return result;
};

const loginUser = async (payload: any) => {
    const user = await prisma.user.findUnique({
        where: {
            email: payload.email
        }
    });
    if (!user) {
        throw new Error('User does not exist');
    }

    const isPasswordValid = await bcrypt.compare(payload.password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
    const jwtPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
    };
    const token = jwt.sign(jwtPayload, config.jwt_secret as string, { expiresIn: '10d' });
    return { token, user };
};

export const UserService = {
    registerUser,
    loginUser,
};
