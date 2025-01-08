import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Getbookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { courseRep } = useAuth();  // Get courseRep from context
  const representativeId = courseRep?.id; // Extract representativeId from courseRep

  // Log representativeId for verification
  console.log(representativeId);

  // Fetch bookings automatically when the representativeId is available
  useEffect(() => {
    if (representativeId) {
      fetchBookings(representativeId);
    } else {
      setError('Representative ID is not available');
    }
  }, [representativeId]); // Runs every time representativeId changes

  const fetchBookings = async (id) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `http://localhost:3003/api/v1/bookings?representativeId=${id}`
      );
      setBookings(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching bookings');
    } finally {
      setLoading(false);
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
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-2 border-b text-gray-800">{booking.class.code}</td>
                  <td className="px-4 py-2 border-b text-gray-800">{booking.class.fullCode}</td>
                  <td className="px-4 py-2 border-b text-gray-800">
                    {booking.class.isAvailable ? 'Available' : 'Unavailable'}
                  </td>
                </tr>
              ))}
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
