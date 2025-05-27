import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import WTImage from './Untitled design (3).png'; // Updated image path

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-gray-00 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-900 to-blue-900 h-96 w-[100%]">
        {/* Direct Image Tag */}
        <img 
          src={WTImage} 
          alt="Background" 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Attractive White Heading with Background Image */}
            <h1
              className="text-5xl font-extrabold sm:text-6xl md:text-7xl drop-shadow-[0_0_10px_rgba(255,255,255,1)] animate-pulse"
              style={{
                WebkitTextStroke: '2px black',
                backgroundImage: `url(${WTImage})`,
                backgroundSize: 'cover',
                backgroundClip: 'text',
                color: 'white',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
              }}
            >
              Central Regional Welfare Society
            </h1>
            <br />
            <br />
            <br />
            <br />
            <br />
            {/* Description Section */}
            <p 
              className="mt-6 text-lg text-black max-w-4xl mx-auto leading-relaxed bg-white p-4 rounded-lg shadow-lg"
              style={{
                textShadow: 'none',
              }}
            >
              The Central Regional Welfare Society is the prime welfare society in the central province of National Water Supply and Drainage Board established in 1989 for ensuring staff cohesiveness, collaboration with pure fostering of Cultural and Social Values. It also aims to develop work satisfaction with greater commitment to effective and efficient fulfillment of assigned job and duties. We also consider our social responsibilities by accommodating the requirement of different needy groups of people such as Elders, Disables, Poor Schools, Childcare Homes, and many other people in need in the wider society.
            </p>
            <br />
            {/* All Buttons in the Same Line */}
            <div className="mt-12 flex flex-wrap justify-center gap-6">
              <a 
                href="/Application for Central Regional Welafer Society Primary.pdf"
                download
                className="relative bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white px-8 py-3 rounded-full shadow-lg transform transition duration-300 hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-300"
              >
                <span className="absolute inset-0 bg-white opacity-0 rounded-full transition-opacity duration-300 hover:opacity-10"></span>
                <span className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 16l5-5m0 0l5 5m-5-5v12M5 20h14a2 2 0 002-2v-5a2 2 0 00-2-2h-3"
                    />
                  </svg>
                  <span>Download Registration form</span>
                </span>
              </a>
              <button
                onClick={() => navigate('/Login')}
                className="relative bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white px-8 py-3 rounded-full shadow-lg transform transition duration-300 hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-green-300"
              >
                <span className="absolute inset-0 bg-white opacity-0 rounded-full transition-opacity duration-300 hover:opacity-10"></span>
                <span className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>Login</span>
                </span>
              </button>
              <Link
                to="/gallery"
                className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg transition duration-200 text-lg"
              >
                View Gallery
              </Link>
              <Link
                to="/events"
                className="inline-block px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow-lg transition duration-200 text-lg"
              >
                View Events
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;