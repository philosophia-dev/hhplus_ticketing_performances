import { User } from 'src/domain/auth/model/user.entity';
import { PerformanceStagingDate } from './performance-staging-date.entity';

export enum ReservationStatus {
  AVAILABLE = 'AVAILABLE',
  TEMPORARY_RESERVED = 'TEMPORARY_RESERVED',
  RESERVED = 'RESERVED',
  UNAVAILABLE = 'UNAVAILABLE',
}

export class PerformanceSeats {
  id: string;
  dateCreated: Date;
  performanceStagingDateId: string;
  performanceStagingDate?: PerformanceStagingDate;
  seatNumber: string;
  price: number;
  reservationStatus: ReservationStatus;
  reservedUserId: string;
  reservedUser?: User;
}
