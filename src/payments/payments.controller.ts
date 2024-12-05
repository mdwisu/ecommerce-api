import { Body, Controller, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-payment-intent')
  createPaymentIntent(@Body() body: { amount: number }) {
    return this.paymentsService.createPaymentIntent(body.amount);
  }
}
