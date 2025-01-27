import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
 const navigate= useNavigate()
  const handleLearn=()=>{
   navigate("/reg")
  }
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center text-white">
      <div className="max-w-4xl mx-auto p-6 text-center">
        {/* Hero Section */}
        <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
          Welcome to <span className="text-yellow-400">Attendance Manager</span>
        </h1>
        <p className="text-lg md:text-xl mb-6 font-medium">
          A smarter way to track, manage, and organize attendance records for
          your institution or organization. Say goodbye to manual processes and
          experience the ease of automated attendance management.
        </p>

        {/* Call to Action */}
        <div className="flex justify-center space-x-4">
          <button onClick={handleLearn} className="px-6 py-3 bg-yellow-400 text-indigo-900 font-semibold rounded-lg shadow-md hover:bg-yellow-500 hover:scale-105 transform transition">
            Get Started
          </button>
          {/* <button className="px-6 py-3 bg-transparent border border-yellow-400 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-500 hover:text-indigo-900 hover:scale-105 transform transition">
            Learn More
          </button> */}
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Easy to Use",
              description:
                "Our intuitive interface allows you to manage attendance effortlessly.",
              icon: "📋",
            },
            {
              title: "Real-Time Updates",
              description:
                "Track attendance live and stay updated with accurate records.",
              icon: "⏱️",
            },
            {
              title: "Secure Data",
              description:
                "Your records are safe with us, ensuring privacy and security.",
              icon: "🔒",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white text-indigo-900 p-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
