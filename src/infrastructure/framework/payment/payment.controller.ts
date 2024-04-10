import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';

@Controller('payment')
export class PaymentController {
  constructor() {}

  @Get('/cash_balance')
  @Header('Authorization', 'none')
  async getCashBalance() {
    const mockData = {
      balance: 100000,
    };
    return mockData;
  }

  @Post('/cash_charge')
  @Header('Authorization', 'none')
  async chargeCash(@Body(ValidationPipe) body: { amount: number }) {
    const mockData = {
      result: 'success',
      balance: 120000,
    };
    return mockData;
  }

  @Get('/payment_history')
  @Header('Authorization', 'none')
  async getPaymentHistory() {
    const mockData = [
      {
        date_created: '2024-04-08T00:00:00.000Z',
        amount: 20000,
        cause: 'CHARGED_BY_USER',
        performance_seat_id: null,
      },
      {
        date_created: '2024-04-08T00:00:00.000Z',
        amount: -100000,
        cause: 'PEYMENT_PERFORMANCE_SEAT',
        performance_seat_id: 1,
      },
    ];
    return mockData;
  }

  @Post('/payment_performance_seat')
  @Header('Authorization', 'none')
  async paymentPerformanceSeat(
    @Body(ValidationPipe) body: { performance_seat_id: string },
  ) {
    const mockData = {
      result: 'success',
      performance_seat_id: 1,
    };
    return mockData;
  }
}
