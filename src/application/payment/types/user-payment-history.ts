import { PaymentHistory } from 'src/domain/payment/model/payment-history.model';

export type UserPaymentHistory = Pick<
  PaymentHistory,
  'dateCreated' | 'amount' | 'cause' | 'performanceSeatId'
>;
