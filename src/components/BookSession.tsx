import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, User } from 'lucide-react';
import toast from 'react-hot-toast';

interface BookSessionProps {
  onClose: () => void;
}

const therapists = [
  { id: 1, name: "Dr. Sarah Johnson", specialty: "Anxiety & Depression", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" },
  { id: 2, name: "Dr. Michael Chen", specialty: "Academic Stress", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" },
  { id: 3, name: "Dr. Emily Williams", specialty: "Personal Development", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" },
];

const timeSlots = [
  "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"
];

export default function BookSession({ onClose }: BookSessionProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTherapist, setSelectedTherapist] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !selectedTherapist) {
      toast.error('Please fill in all fields');
      return;
    }

    const therapist = therapists.find(t => t.id === selectedTherapist);
    toast.success(
      `Session booked with ${therapist?.name} on ${format(new Date(selectedDate), 'MMMM d, yyyy')} at ${selectedTime}`
    );
    onClose();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Book a Session</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Therapist
          </label>
          <div className="grid grid-cols-1 gap-4">
            {therapists.map((therapist) => (
              <div
                key={therapist.id}
                className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                  selectedTherapist === therapist.id
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-300'
                }`}
                onClick={() => setSelectedTherapist(therapist.id)}
              >
                <img
                  src={therapist.avatar}
                  alt={therapist.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-4">
                  <h3 className="font-medium">{therapist.name}</h3>
                  <p className="text-sm text-gray-500">{therapist.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Time
          </label>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => setSelectedTime(time)}
                className={`p-2 text-center border rounded-md ${
                  selectedTime === time
                    ? 'bg-indigo-600 text-white'
                    : 'hover:border-indigo-300'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
}