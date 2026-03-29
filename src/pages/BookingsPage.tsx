import React, { useState, useEffect } from 'react';
import type { Booking } from '../types';
import { BookingStatus } from '../types';
import { Calendar, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import * as apiService from '../services/apiService';

const BookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await apiService.getUserBookings();
      setBookings(data);
      setLoading(false);
    } catch (err: any) {
      setError('Failed to fetch bookings');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdateStatus = async (bookingId: string, status: BookingStatus) => {
    try {
      setActionLoading(bookingId);
      await apiService.updateBookingStatus(bookingId, status);
      await fetchBookings();
      setActionLoading(null);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update status');
      setActionLoading(null);
    }
  };

  const getStatusStyle = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case BookingStatus.CONFIRMED:
        return 'bg-green-100 text-green-800 border-green-200';
      case BookingStatus.CANCELLED:
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.PENDING:
        return <Clock size={14} />;
      case BookingStatus.CONFIRMED:
        return <CheckCircle2 size={14} />;
      case BookingStatus.CANCELLED:
        return <XCircle size={14} />;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary-blue">My Bookings</h1>
        <p className="text-gray-600">Track and manage your service requests.</p>
      </div>

      {error && (
        <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700 flex items-center gap-2">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map(i => (
            <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 animate-pulse h-32"></div>
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
          <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg font-medium">You haven't booked any services yet.</p>
          <Link to="/">
            <Button variant="primary" className="mt-4">Browse Services</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map(booking => (
            <div key={booking._id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-50 rounded-lg text-primary-blue">
                  <Calendar size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary-blue">{booking.service.title}</h3>
                  <p className="text-sm text-gray-500">Booked on {new Date(booking.createdAt).toLocaleDateString()}</p>
                  <div className={`mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusStyle(booking.status)}`}>
                    {getStatusIcon(booking.status)}
                    <span className="uppercase tracking-wider">{booking.status}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {booking.status === BookingStatus.PENDING && (
                  <>
                    <Button 
                      variant="outline" 
                      className="text-xs px-4 py-2 h-auto text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                      onClick={() => handleUpdateStatus(booking._id, BookingStatus.CANCELLED)}
                      isLoading={actionLoading === booking._id}
                    >
                      Cancel
                    </Button>
                    <Button 
                      variant="secondary" 
                      className="text-xs px-4 py-2 h-auto"
                      onClick={() => handleUpdateStatus(booking._id, BookingStatus.CONFIRMED)}
                      isLoading={actionLoading === booking._id}
                    >
                      Confirm
                    </Button>
                  </>
                )}
                {booking.status === BookingStatus.CONFIRMED && (
                  <div className="text-sm text-green-600 font-medium flex items-center gap-1">
                    <CheckCircle2 size={16} />
                    Confirmed
                  </div>
                )}
                {booking.status === BookingStatus.CANCELLED && (
                  <div className="text-sm text-red-600 font-medium flex items-center gap-1">
                    <XCircle size={16} />
                    Cancelled
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
