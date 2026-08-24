import prisma from '../../utils/prisma';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
const registerUser = async (userData: any) => {
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    const dataToSave = { ...userData, password: hashedPassword };
    const result = await prisma.user.create({
        data: dataToSave,
    });
    return result;
};

export const UserService = {
    registerUser,
};
