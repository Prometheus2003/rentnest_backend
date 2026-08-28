import prisma from '../../utils/prisma';
import Stripe from 'stripe';
import config from '../../config';


const stripe = new Stripe(config.stripe_secret as string, {
    apiVersion: '2026-08-26.dahlia',
});

const processPayment = async (rentalRequestId: string, tenantId: string) => {
    const request = await prisma.rentalRequest.findUnique({
        where: { id: rentalRequestId },
        include: { property: true }
    });

    if (!request) {
        throw new Error("Rental request not found");
    }
    if (request.tenantId !== tenantId) {
        throw new Error("You are not authorized to pay for this request");
    }
    if (request.status !== 'APPROVED') {
        throw new Error("You can only pay for APPROVED rental requests");
    }
    if (request.paymentStatus === 'PAID') {
        throw new Error("This request has already been paid for!");
    }

    const amountInCents = Math.round(request.property.price * 100);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: 'usd',
        metadata: {
            rentalRequestId: request.id,
            tenantId: tenantId
        }
    });

    const result = await prisma.rentalRequest.update({
        where: { id: rentalRequestId },
        data: {
            paymentStatus: 'PAID',
            paymentId: paymentIntent.id
        }
    });

    return {
        transactionId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
        paymentStatus: result.paymentStatus
    };
};

export const paymentService = {
    processPayment
}