import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  HttpStatus,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiHeaders,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CashBalanceDto,
  CashChargeResponseDto,
  PerformanceSeatPaymentResponseDto,
} from '../dto/payment/payment.response.dto';
import {
  CashChargeDto,
  PaymentHistoryDto,
  PerformanceSeatPaymentDto,
} from '../dto/payment/payment.request.dto';
@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor() {}

  @ApiOperation({
    summary: '포인트 잔액 조회',
    description: '현재 포인트의 잔액을 조회한다.',
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description:
        '유저가 로그인 시 발급 받은 접근 토큰 : Bearer {USER_ACCESS_TOKEN}',
    },
  ])
  @ApiResponse({
    status: HttpStatus.OK,
    type: CashBalanceDto,
    schema: {
      example: {
        balance: 100000,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    schema: {
      example: {
        message: '<error-message>',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    schema: {
      example: {
        message: '<error-message>',
        error: 'Bad Request',
        statusCode: 401,
      },
    },
  })
  @Get('/cash_balance')
  async getCashBalance(@Headers('authorization') authorization: string) {
    const MOCK_DATA = {
      balance: 100000,
    };
    return MOCK_DATA;
  }

  @ApiOperation({
    summary: '포인트 충전',
    description: '포인트를 충전한다.',
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description:
        '유저가 로그인 시 발급 받은 접근 토큰 : Bearer {USER_ACCESS_TOKEN}',
    },
  ])
  @ApiBody({ type: CashChargeDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CashChargeResponseDto,
    schema: {
      example: {
        result: 'success',
        balance: 120000,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    schema: {
      example: {
        message: '<error-message>',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    schema: {
      example: {
        message: '<error-message>',
        error: 'Bad Request',
        statusCode: 401,
      },
    },
  })
  @Post('/cash_charge')
  async chargeCash(
    @Headers('authorization') authorization: string,
    @Body(ValidationPipe) body: { amount: number },
  ) {
    const MOCK_DATA = {
      result: 'success',
      balance: 120000,
    };
    return MOCK_DATA;
  }

  @ApiOperation({
    summary: '포인트 입출금 내역 조회',
    description: '포인트의 입출금 내역을 조회한다.',
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description:
        '유저가 로그인 시 발급 받은 접근 토큰 : Bearer {USER_ACCESS_TOKEN}',
    },
  ])
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaymentHistoryDto,
    schema: {
      example: [
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
          performance_seat_id: '123e4567-e89b-12d3-a456-426614174000',
        },
      ],
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    schema: {
      example: {
        message: '<error-message>',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    schema: {
      example: {
        message: '<error-message>',
        error: 'Bad Request',
        statusCode: 401,
      },
    },
  })
  @Get('/payment_history')
  async getPaymentHistory(@Headers('authorization') authorization: string) {
    const MOCK_DATA = [
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
    return MOCK_DATA;
  }

  @ApiOperation({
    summary: '좌석 결제',
    description: '선점한 좌석을 결제한다.',
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description:
        '유저가 로그인 시 발급 받은 접근 토큰 : Bearer {USER_ACCESS_TOKEN}',
    },
  ])
  @ApiBody({ type: PerformanceSeatPaymentDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: PerformanceSeatPaymentResponseDto,
    schema: {
      example: {
        result: 'success',
        performance_seat_id: 1,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    schema: {
      example: {
        message: '<error-message>',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    schema: {
      example: {
        message: '<error-message>',
        error: 'Bad Request',
        statusCode: 401,
      },
    },
  })
  @Post('/payment_performance_seat')
  async paymentPerformanceSeat(
    @Headers('authorization') authorization: string,
    @Body(ValidationPipe) body: { performance_seat_id: string },
  ) {
    const MOCK_DATA = {
      result: 'success',
      performance_seat_id: '123e4567-e89b-12d3-a456-426614174000',
    };
    return MOCK_DATA;
  }
}
