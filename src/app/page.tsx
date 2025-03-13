'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaBasketballBall, FaFootballBall, FaBaseballBall, FaFutbol } from 'react-icons/fa';
import { GiTennisCourt } from 'react-icons/gi';

export default function Home() {
  const sports = [
    {
      id: 'basketball',
      name: 'Basketball',
      description: 'NBA game analysis with detailed insights on matchups and playoff implications',
      icon: <FaBasketballBall className="text-orange-500 text-4xl" />,
      gradient: 'from-orange-500 to-orange-600',
      textColor: 'text-orange-600',
      borderColor: 'border-orange-200',
      hoverColor: 'hover:bg-orange-50',
    },
    {
      id: 'baseball',
      name: 'Baseball',
      description: 'MLB game analysis with insights on key series and playoff races',
      icon: <FaBaseballBall className="text-blue-500 text-4xl" />,
      gradient: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-200',
      hoverColor: 'hover:bg-blue-50',
    },
    {
      id: 'football',
      name: 'Football',
      description: 'NFL game analysis with detailed breakdowns of matchups and playoff scenarios',
      icon: <FaFootballBall className="text-green-500 text-4xl" />,
      gradient: 'from-green-500 to-green-600',
      textColor: 'text-green-600',
      borderColor: 'border-green-200',
      hoverColor: 'hover:bg-green-50',
    },
    {
      id: 'soccer',
      name: 'Soccer',
      description: 'Soccer match analysis covering major leagues and tournaments worldwide',
      icon: <FaFutbol className="text-purple-500 text-4xl" />,
      gradient: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-600',
      borderColor: 'border-purple-200',
      hoverColor: 'hover:bg-purple-50',
    },
    {
      id: 'tennis',
      name: 'Tennis',
      description: 'Tennis match analysis for Grand Slams, ATP/WTA tournaments, and key player matchups',
      icon: <GiTennisCourt className="text-green-600 text-4xl" />,
      gradient: 'from-green-600 to-green-700',
      textColor: 'text-green-600',
      borderColor: 'border-green-200',
      hoverColor: 'hover:bg-green-50',
    },
  ];

  return (
    <div>
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center mb-12">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6 shadow-lg">
            <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2.00001 17.5228 6.47717 22 12 22Z"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="0.5 2.5" />
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                fill="currentColor" />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-poppins tracking-tight text-gray-900 text-center mb-3">
            Game Analyzer
          </h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto text-xl mb-8">
            Discover the most critical games with detailed analysis across all major sports
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div
              className="bg-white rounded-xl shadow-md p-5 flex items-start border border-gray-100"
              whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 text-lg mb-1 font-poppins">In-depth Analysis</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Get detailed insights on game importance, matchups, and playoff implications.</p>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl shadow-md p-5 flex items-start border border-gray-100"
              whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 text-lg mb-1 font-poppins">Key Matchups</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Understand critical player and team dynamics that will influence game outcomes.</p>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl shadow-md p-5 flex items-start border border-gray-100"
              whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 text-lg mb-1 font-poppins">Smart Filtering</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Easily filter by importance, week, or playoff round to focus on games that matter most.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold font-poppins text-center mb-12">Choose Your Sport</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sports.map((sport) => (
            <motion.div
              key={sport.id}
              className={`bg-white rounded-xl shadow-md overflow-hidden border ${sport.borderColor} ${sport.hoverColor} transition-all`}
              whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
            >
              <Link href={`/sports/${sport.id}`} className="block">
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${sport.gradient} flex items-center justify-center mr-5 shadow-md`}>
                      {sport.icon}
                    </div>
                    <h3 className={`text-2xl font-bold font-poppins ${sport.textColor}`}>{sport.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-6">{sport.description}</p>
                  <div className={`inline-flex items-center ${sport.textColor} font-medium`}>
                    View Games
                    <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
