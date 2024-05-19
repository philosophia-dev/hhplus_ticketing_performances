import { User } from 'src/domain/auth/model/user.model';
import { PerformanceStagingDate } from './performance-staging-date.model';

export enum ReservationStatus {
  AVAILABLE = 'AVAILABLE',
  TEMPORARY_RESERVED = 'TEMPORARY_RESERVED',
  RESERVED = 'RESERVED',
  UNAVAILABLE = 'UNAVAILABLE',
}

export interface PerformanceSeat {
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
