import React, { useState } from "react";
import axios from "axios";

const Addevent = () => {
  const [description, setDescription] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      await axios.post(
        "/events",
        { description, month, year },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
      setDescription("");
      setMonth("");
      setYear("");
    } catch (err) {
      setError("Failed to add event. Please try again.");
    }
  };

  // Generate year options (current year +/- 10 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-black-700">Add Event</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter event description"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Month and Year:</label>
          <div className="flex gap-4">
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              required
              className="w-1/2 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Month</option>
              {[
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
              ].map((m, idx) => (
                <option key={m} value={String(idx + 1).padStart(2, '0')}>{m}</option>
              ))}
            </select>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
              className="w-1/2 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Year</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          Add Event
        </button>
        {success && (
          <div className="mt-4 text-green-600 text-center font-semibold">
            Event added successfully!
          </div>
        )}
        {error && (
          <div className="mt-4 text-red-600 text-center font-semibold">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default Addevent;