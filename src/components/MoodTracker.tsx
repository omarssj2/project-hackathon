import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Smile, Meh, Frown, Save } from 'lucide-react';
import toast from 'react-hot-toast';

interface MoodTrackerProps {
  onClose: () => void;
}

interface MoodEntry {
  date: string;
  mood: number;
  note: string;
}

export default function MoodTracker({ onClose }: MoodTrackerProps) {
  const [currentMood, setCurrentMood] = useState<number | null>(null);
  const [note, setNote] = useState('');
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);

  useEffect(() => {
    // Load mood history from localStorage
    const savedMoods = localStorage.getItem('moodHistory');
    if (savedMoods) {
      setMoodHistory(JSON.parse(savedMoods));
    }
  }, []);

  const handleSave = () => {
    if (currentMood === null) {
      toast.error('Please select your mood');
      return;
    }

    const newEntry: MoodEntry = {
      date: new Date().toISOString().split('T')[0],
      mood: currentMood,
      note: note
    };

    const updatedHistory = [...moodHistory, newEntry];
    setMoodHistory(updatedHistory);
    localStorage.setItem('moodHistory', JSON.stringify(updatedHistory));
    
    toast.success('Mood tracked successfully!');
    setCurrentMood(null);
    setNote('');
  };

  const moodEmojis = [
    { value: 1, icon: <Frown className="w-8 h-8" />, label: "Not Great" },
    { value: 2, icon: <Meh className="w-8 h-8" />, label: "Okay" },
    { value: 3, icon: <Smile className="w-8 h-8" />, label: "Good" },
  ];

  return (
    <div className="p-6 max-w-2xl w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Mood Tracker</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ×
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">How are you feeling today?</h3>
        <div className="flex justify-center space-x-8 mb-4">
          {moodEmojis.map(({ value, icon, label }) => (
            <button
              key={value}
              onClick={() => setCurrentMood(value)}
              className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                currentMood === value
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-500 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              {icon}
              <span className="mt-1 text-sm">{label}</span>
            </button>
          ))}
        </div>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note about how you're feeling..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          rows={3}
        />

        <button
          onClick={handleSave}
          className="mt-4 w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Save Entry</span>
        </button>
      </div>

      {moodHistory.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-3">Your Mood History</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moodHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 3]} ticks={[1, 2, 3]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="#4F46E5"
                  strokeWidth={2}
                  dot={{ fill: '#4F46E5' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}