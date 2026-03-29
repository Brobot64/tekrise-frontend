import api from '../utils/api';
import type { Service, Booking } from '../types';
import { BookingStatus } from '../types';

export const getServices = async (): Promise<Service[]> => {
  const response = await api.get('/services');
  return response.data;
};

export const createService = async (serviceData: { title: string; description: string }): Promise<Service> => {
  const response = await api.post('/services', serviceData);
  return response.data;
};

export const deleteService = async (id: string): Promise<void> => {
  await api.delete(`/services/${id}`);
};

export const bookService = async (serviceId: string): Promise<Booking> => {
  const response = await api.post('/bookings', { serviceId });
  return response.data;
};

export const getUserBookings = async (): Promise<Booking[]> => {
  const response = await api.get('/bookings');
  return response.data;
};

export const updateBookingStatus = async (id: string, status: BookingStatus): Promise<Booking> => {
  const response = await api.patch(`/bookings/${id}`, { status });
  return response.data;
};
