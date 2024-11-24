import React from 'react';
import { Book, Video, FileText, Download } from 'lucide-react';

const resources = [
  {
    title: "Understanding Anxiety",
    type: "article",
    description: "Learn about the different types of anxiety and coping mechanisms",
    icon: FileText,
    link: "#",
    category: "Mental Health"
  },
  {
    title: "Meditation Basics",
    type: "video",
    description: "A beginner's guide to meditation and mindfulness",
    icon: Video,
    link: "#",
    category: "Wellness"
  },
  {
    title: "Study Techniques",
    type: "guide",
    description: "Evidence-based study methods for better academic performance",
    icon: Book,
    link: "#",
    category: "Academic"
  },
  {
    title: "Stress Management Workbook",
    type: "download",
    description: "Interactive exercises for managing stress",
    icon: Download,
    link: "#",
    category: "Self-Help"
  }
];

export default function Resources() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mental Health Resources</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => {
          const Icon = resource.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-indigo-100 rounded-lg p-2">
                    <Icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                    {resource.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <a
                  href={resource.link}
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
                >
                  <span className="font-medium">Access Resource</span>
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Emergency Support Section */}
      <div className="mt-12 bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-red-800 mb-4">Need Immediate Support?</h2>
        <p className="text-red-700 mb-4">
          If you're experiencing a mental health emergency, please reach out to these resources:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-red-700">
          <li>Emergency Services: 911</li>
          <li>National Crisis Hotline: 1-800-273-8255</li>
          <li>Crisis Text Line: Text HOME to 741741</li>
        </ul>
      </div>
    </div>
  );
}