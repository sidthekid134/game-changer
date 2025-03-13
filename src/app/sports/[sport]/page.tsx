'use client';

import React, { useEffect, useState } from 'react';
import { fetchUpcomingGames } from '../../api/sportsApi';
import { GamesResponse, SportType } from '../../types';
import GameGrid from '../../components/GameGrid';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

// Helper function to get sport display name
const getSportDisplayName = (sport: string): string => {
    switch (sport) {
        case 'basketball':
            return 'Basketball';
        case 'baseball':
            return 'Baseball';
        case 'football':
            return 'Football';
        case 'soccer':
            return 'Soccer';
        default:
            return 'Sport';
    }
};

// Helper function to get sport icon color
const getSportColor = (sport: string): string => {
    switch (sport) {
        case 'basketball':
            return 'text-orange-500';
        case 'baseball':
            return 'text-blue-500';
        case 'football':
            return 'text-green-500';
        case 'soccer':
            return 'text-purple-500';
        default:
            return 'text-gray-500';
    }
};

export default function SportPage() {
    const params = useParams();
    const sport = params.sport as string;
    const sportType = sport as SportType;
    const sportDisplayName = getSportDisplayName(sport);
    const sportColor = getSportColor(sport);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [gamesData, setGamesData] = useState<GamesResponse | null>(null);

    useEffect(() => {
        const loadGames = async () => {
            try {
                setLoading(true);
                const data = await fetchUpcomingGames(sportType);
                setGamesData(data);
                setError(null);
            } catch (err) {
                console.error(`Error loading ${sportDisplayName} games:`, err);
                setError(`Failed to load ${sportDisplayName} games. Please try again later.`);
            } finally {
                setLoading(false);
            }
        };

        loadGames();
    }, [sportType, sportDisplayName]);

    return (
        <div>
            <div className="mb-8">
                <Link
                    href="/"
                    className={`inline-flex items-center ${sportColor} hover:opacity-80 transition-opacity mb-6`}
                >
                    <FaArrowLeft className="mr-2" />
                    <span>Back to All Sports</span>
                </Link>

                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className={`text-3xl sm:text-4xl font-bold font-poppins tracking-tight ${sportColor} text-center mb-2`}>
                        {sportDisplayName} Game Analyzer
                    </h1>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto text-lg">
                        Discover the most critical {sportDisplayName} games with detailed analysis
                    </p>
                </motion.div>
            </div>

            {loading && (
                <div className="flex flex-col justify-center items-center py-32">
                    <motion.div
                        className="relative w-16 h-16"
                        animate={{
                            rotate: 360
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
                        <div className={`absolute top-0 left-0 w-full h-full border-4 border-t-${sportColor.replace('text-', '')} border-r-transparent border-b-transparent border-l-transparent rounded-full`}></div>
                    </motion.div>
                    <p className="mt-6 text-gray-600 font-medium text-lg font-poppins">Loading games...</p>
                    <p className="text-sm text-gray-500 mt-2">Please wait while we analyze upcoming {sportDisplayName} matchups</p>
                </div>
            )}

            {error && (
                <motion.div
                    className="bg-red-50 border border-red-200 text-red-700 px-8 py-6 rounded-xl shadow-md max-w-3xl mx-auto my-16"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <h3 className="font-medium text-red-800 text-lg mb-2 font-poppins">Error Loading Games</h3>
                    <p className="mb-4">{error}</p>
                    <button
                        className="bg-red-100 text-red-800 px-5 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </button>
                </motion.div>
            )}

            {!loading && !error && gamesData && (
                <GameGrid
                    games={gamesData.games}
                    competitions={gamesData.competitions}
                    matchdays={gamesData.matchdays}
                    stages={gamesData.stages}
                    sportType={sportType}
                />
            )}
        </div>
    );
} 