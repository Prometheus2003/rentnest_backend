import prisma from '../../utils/prisma'

const getAllUsers = async () => {
    const result = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isActive: true,
            createdAt: true
        }
    })
    return result;
}

const updateUserStatus = async (userId: string, isActive: boolean) => {
    const result = await prisma.user.update({
        where: { id: userId },
        data: { isActive },
        select: { id: true, name: true, email: true, role: true, isActive: true }
    })
    return result
}
export const AdminService = {
    getAllUsers,
    updateUserStatus
}