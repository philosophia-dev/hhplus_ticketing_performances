import { PerformanceSeat } from 'src/domain/reservation/model/performance-seat.model';

export type PerformanceSeatInfo = Pick<
  PerformanceSeat,
  'id' | 'seatNumber' | 'price' | 'reservationStatus'
>;
