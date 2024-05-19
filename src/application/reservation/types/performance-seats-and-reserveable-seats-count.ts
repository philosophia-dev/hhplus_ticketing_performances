import { PerformanceSeat } from 'src/domain/reservation/model/performance-seat.model';

export type PerformanceSeatsAndReserveableSeatsCount = {
  seats: Pick<
    PerformanceSeat,
    'id' | 'seatNumber' | 'price' | 'reservationStatus'
  >[];
  reserveableSeatsCount: number;
};
