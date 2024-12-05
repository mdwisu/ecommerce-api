import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe('your-stripe-secret-key', {
      apiVersion: '2024-11-20.acacia',
    });
  }

  async createPaymentIntent(amount: number) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });
    return paymentIntent.client_secret;
  }
}
