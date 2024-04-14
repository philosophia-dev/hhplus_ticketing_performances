import { ApiProperty } from '@nestjs/swagger';

export class CashBalanceDto {
  @ApiProperty({ example: 100000 })
  balance: number;
}

export class PaymentHistoryDto {
  @ApiProperty({ example: '2024-04-08T00:00:00.000Z' })
  date_created: Date;

  @ApiProperty({ example: 20000 })
  amount: number;

  @ApiProperty({ example: 'CHARGED_BY_USER' })
  cause: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    nullable: true,
  })
  performance_seat_id: string | null;
}

export class CashChargeResponseDto {
  @ApiProperty({ example: 'success' })
  result: string;

  @ApiProperty({ example: 120000 })
  balance: number;
}

export class PerformanceSeatPaymentResponseDto {
  @ApiProperty({ example: 'success' })
  result: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  performance_seat_id: string;
}
