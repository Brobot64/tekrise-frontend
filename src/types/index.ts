export interface User {
  _id: string;
  name: string;
  email: string;
  token?: string;
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  createdBy: User | string;
  createdAt: string;
}

export const BookingStatus = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
} as const;

export type BookingStatus = typeof BookingStatus[keyof typeof BookingStatus];

export interface Booking {
  _id: string;
  user: User | string;
  service: Service;
  status: BookingStatus;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
