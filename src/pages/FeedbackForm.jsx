import React, { useState } from 'react';
import axios from 'axios';

function FeedbackForm() {
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      setResponseMessage('Message cannot be empty.');
      return;
    }

    setIsLoading(true);
    setResponseMessage('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/feedback`,{ message });
      setResponseMessage('Feedback submitted successfully!');
      setMessage('');
    } catch (error) {
      if (error.response && error.response.data) {
        setResponseMessage(error.response.data.message || 'An error occurred.');
      } else {
        setResponseMessage('Unable to submit feedback. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">Leave Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your feedback here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className={`w-full py-2 px-4 text-white font-semibold bg-blue-500 rounded-lg 
            hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
      {responseMessage && (
        <p
          className={`mt-4 text-sm text-center ${
            responseMessage.includes('successfully') ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {responseMessage}
        </p>
      )}
    </div>
  );
}

export default FeedbackForm;
