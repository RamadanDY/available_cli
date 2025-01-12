import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Getbookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [updatedTimeRange, setUpdatedTimeRange] = useState({ start: '', end: '' });
  const navigate = useNavigate();
  const { courseRep } = useAuth();
  const representativeId = courseRep?.id;

  useEffect(() => {
    if (representativeId) {
      fetchBookings(representativeId);
    } else {
      setError('Representative ID is not available');
    }
  }, [representativeId]);

  const fetchBookings = async (id) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        ` ${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/v1/bookings?representativeId=${id}`
      );
      setBookings(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching bookings');
    } finally {
      setLoading(false);
    }
  };

  const isValidDate = (date) => {
    return !isNaN(new Date(date).getTime());
  };

  const handleUpdateBooking = async (bookingId) => {
    if (
      !updatedTimeRange.start ||
      !updatedTimeRange.end ||
      !isValidDate(updatedTimeRange.start) ||
      !isValidDate(updatedTimeRange.end)
    ) {
      setError('Invalid time range. Please provide valid start and end times.');
      return;
    }

    if (new Date(updatedTimeRange.start) >= new Date(updatedTimeRange.end)) {
      setError('Start time must be earlier than end time.');
      return;
    }

    try {
      const response = await axios.patch(
         `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/v1/bookings/${bookingId}`,
        {
          timeRange: {
            start: updatedTimeRange.start,
            end: updatedTimeRange.end,
          },
        }
      );

      // Update the booking in state
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId ? response.data : booking
        )
      );

      setEditingBookingId(null); // Exit editing mode
      setUpdatedTimeRange({ start: '', end: '' });
      setError(''); // Clear error message
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Error updating booking';
      setError(errorMessage);

      if (errorMessage.includes('overlaps')) {
        // Specific feedback for overlap errors
        alert('The updated booking time overlaps with another booking.');
      }
    }
  };

  const Backhome = () => {
    navigate('/');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Representative Bookings</h1>

      {/* Error Message */}
      {error && (
        <div className="mt-4 text-red-500 bg-red-100 p-3 rounded-md">
          {error}
        </div>
      )}

      {/* Bookings Table */}
      <div className="mt-6">
        {bookings.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 text-gray-700 font-semibold border-b">Class Code</th>
                <th className="px-4 py-2 text-gray-700 font-semibold border-b">Full Code</th>
                <th className="px-4 py-2 text-gray-700 font-semibold border-b">Availability</th>
                <th className="px-4 py-2 text-gray-700 font-semibold border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => {
                const isEditing = editingBookingId === booking._id;
                return (
                  <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-2 border-b text-gray-800">{booking.class.code}</td>
                    <td className="px-4 py-2 border-b text-gray-800">{booking.class.fullCode}</td>
                    <td className="px-4 py-2 border-b text-gray-800">
                      {booking.class.isAvailable ? 'Available' : 'Unavailable'}
                    </td>
                    <td className="px-4 py-2 border-b text-gray-800">
                      {isEditing ? (
                        <div>
                          <input
                            type="datetime-local"
                            value={updatedTimeRange.start}
                            onChange={(e) =>
                              setUpdatedTimeRange((prev) => ({
                                ...prev,
                                start: e.target.value,
                              }))
                            }
                            className="mr-2 border rounded px-2 py-1"
                          />
                          <input
                            type="datetime-local"
                            value={updatedTimeRange.end}
                            onChange={(e) =>
                              setUpdatedTimeRange((prev) => ({
                                ...prev,
                                end: e.target.value,
                              }))
                            }
                            className="mr-2 border rounded px-2 py-1"
                          />
                          <button
                            onClick={() => handleUpdateBooking(booking._id)}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingBookingId(null)}
                            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingBookingId(booking._id);
                            setUpdatedTimeRange({
                              start: new Date(booking.timeRange.start)
                                .toISOString()
                                .slice(0, 16),
                              end: booking.timeRange.end
                                ? new Date(booking.timeRange.end)
                                    .toISOString()
                                    .slice(0, 16)
                                : '',
                            });
                          }}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="text-gray-600 mt-4">{loading ? '' : 'No bookings found'}</div>
        )}
      </div>

      <div className="bg-blue-500 m-32">
        <button onClick={Backhome}>Home</button>
      </div>
    </div>
  );
};

export default Getbookings;
