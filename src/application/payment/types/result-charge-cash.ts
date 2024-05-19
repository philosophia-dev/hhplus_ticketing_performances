import { CashBalance } from 'src/domain/payment/model/cash-balance.model';

export type ResultChargeCash = {
  result: 'success'; // 실패의 경우에는 use case에서 에러를 반환하므로 현재 result의 타입은 success가 유일
} & Pick<CashBalance, 'userId' | 'balance'>;
