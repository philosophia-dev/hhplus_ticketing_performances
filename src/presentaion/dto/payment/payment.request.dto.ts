import { ApiProperty } from '@nestjs/swagger';

export class CashChargeDto {
  @ApiProperty({ example: 50000 })
  amount: number;
}

export class PaymentHistoryDto {
  @ApiProperty({ example: '2024-04-08T00:00:00.000Z' })
  dateCreated: Date;

  @ApiProperty({ example: 20000 })
  amount: number;

  @ApiProperty({ example: 'CHARGED_BY_USER' })
  cause: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    nullable: true,
  })
  performanceSeatId: string | null;
}

export class PerformanceSeatPaymentDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  performanceSeatId: string;
}
