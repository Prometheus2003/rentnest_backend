import prisma from '../../utils/prisma';
import crypto from 'crypto';

const processPayment = async (rentalRequestId: string, tenantId: string) => {
    const request = await prisma.rentalRequest.findUnique({
        where: { id: rentalRequestId }

    })

    if (!request) {
        throw new Error("Rental request not found")
    }

    if (request.tenantId !== tenantId) {
        throw new Error("You are not authorzed to pay for this request")
    }

    if (request.status !== 'APPROVED') {
        throw new Error("You can only pay for Approved rental request")
    }

    if (request.paymentStatus === 'PAID') {
        throw new Error("This request has already been paid for!")
    }

    const transactionID = `txn_${crypto.randomUUID()}`

    const result = await prisma.rentalRequest.update({
        where: { id: rentalRequestId },
        data: {
            paymentStatus: 'PAID',
            paymentId: transactionID
        }
    });
    return result;
}
export const paymentService = {
    processPayment
}