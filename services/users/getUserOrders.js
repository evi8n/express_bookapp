import { PrismaClient } from '@prisma/client';


const getUserOrders = async (userId) => {
    const prisma = new PrismaClient();
    const userOrders = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            orders: true,
        },
    });
    if (!userOrders) {
        throw new NotFoundError('User', userId);
    }
    return userOrders;
};

export default getUserOrders;