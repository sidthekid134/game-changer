import React, { useState } from 'react';
import { Game, ImportanceTag, SportType } from '../types';
import { FaBasketballBall, FaBaseballBall, FaFootballBall, FaFutbol, FaInfoCircle, FaChevronDown, FaChevronUp, FaStar, FaMapMarkerAlt, FaClock, FaUsers, FaTrophy, FaTable } from 'react-icons/fa';
import { GiTennisCourt } from 'react-icons/gi';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface GameCardProps {
    game: Game;
    sportType: SportType;
}

const GameCard: React.FC<GameCardProps> = ({ game, sportType }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    // Get sport-specific icon
    const getSportIcon = () => {
        switch (sportType) {
            case 'basketball':
                return <FaBasketballBall className="text-orange-500" />;
            case 'baseball':
                return <FaBaseballBall className="text-blue-500" />;
            case 'football':
                return <FaFootballBall className="text-green-500" />;
            case 'soccer':
                return <FaFutbol className="text-purple-500" />;
            case 'tennis':
                return <GiTennisCourt className="text-green-600" />;
            default:
                return <FaBasketballBall className="text-orange-500" />;
        }
    };

    // Get sport-specific color
    const getSportColor = () => {
        switch (sportType) {
            case 'basketball':
                return 'bg-orange-500';
            case 'baseball':
                return 'bg-blue-500';
            case 'football':
                return 'bg-green-500';
            case 'soccer':
                return 'bg-purple-500';
            case 'tennis':
                return 'bg-green-600';
            default:
                return 'bg-blue-500';
        }
    };

    // Get tag color based on tag type
    const getTagColor = (tag: ImportanceTag): string => {
        switch (tag) {
            case 'Playoff Implications':
            case 'Playoff Berth':
            case 'Division Title':
                return 'bg-red-100 text-red-800';
            case 'Rivalry Game':
            case 'Derby Match':
                return 'bg-purple-100 text-purple-800';
            case 'Star Matchup':
            case 'MVP Candidate':
                return 'bg-amber-100 text-amber-800';
            case 'Potential Upset':
                return 'bg-green-100 text-green-800';
            case 'Record Chase':
                return 'bg-blue-100 text-blue-800';
            case 'Championship Rematch':
            case 'Conference Finals Rematch':
            case 'Super Bowl Rematch':
                return 'bg-indigo-100 text-indigo-800';
            case 'Return From Injury':
                return 'bg-teal-100 text-teal-800';
            case 'Rookie Showcase':
                return 'bg-cyan-100 text-cyan-800';
            case 'Late Season Push':
            case 'Wild Card Hunt':
            case 'Division Race':
            case 'Relegation Battle':
            case 'Title Decider':
            case 'Champions League Spot':
                return 'bg-orange-100 text-orange-800';
            case 'Player Streak':
            case 'No-Hitter Watch':
                return 'bg-pink-100 text-pink-800';
            case 'Hot Team':
                return 'bg-rose-100 text-rose-800';
            // Tennis specific
            case 'Grand Slam':
                return 'bg-yellow-100 text-yellow-800';
            case 'Masters 1000':
            case 'ATP Finals':
            case 'Davis Cup':
                return 'bg-blue-100 text-blue-800';
            case 'Top 10 Matchup':
            case 'Career Milestone':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Format game time
    const formatGameTime = (time: string) => {
        // Check if time is in 24-hour format (e.g., "19:30")
        if (time.includes(':')) {
            const [hours, minutes] = time.split(':').map(Number);
            const period = hours >= 12 ? 'PM' : 'AM';
            const displayHours = hours % 12 || 12;
            return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
        }
        return time;
    };

    // Get sport-specific game details
    const renderSportSpecificDetails = () => {
        switch (sportType) {
            case 'basketball':
                return (
                    <>
                        {game.week && (
                            <div className="text-xs text-gray-500 mb-1">
                                Week {game.week}
                            </div>
                        )}
                        {game.playoffRound && (
                            <div className="text-xs font-medium text-amber-600 mb-1">
                                {game.playoffRound}
                            </div>
                        )}
                    </>
                );
            case 'baseball':
                return (
                    <>
                        {game.seriesInfo?.isSeriesGame && (
                            <div className="text-xs font-medium text-blue-600 mb-1">
                                Game {game.seriesInfo.gameNumber} of {game.seriesInfo.totalGames}
                            </div>
                        )}
                        {game.playoffRound && (
                            <div className="text-xs font-medium text-amber-600 mb-1">
                                {game.playoffRound}
                            </div>
                        )}
                    </>
                );
            case 'football':
                return (
                    <>
                        {game.week && (
                            <div className="text-xs text-gray-500 mb-1">
                                Week {game.week}
                            </div>
                        )}
                        {game.playoffRound && (
                            <div className="text-xs font-medium text-green-600 mb-1">
                                {game.playoffRound}
                            </div>
                        )}
                    </>
                );
            case 'soccer':
                return (
                    <>
                        {game.competition && (
                            <div className="text-xs font-medium text-purple-600 mb-1">
                                {game.competition}
                            </div>
                        )}
                        {game.matchday && (
                            <div className="text-xs text-gray-500 mb-1">
                                Matchday {game.matchday}
                            </div>
                        )}
                        {game.stage && (
                            <div className="text-xs font-medium text-purple-600 mb-1">
                                {game.stage}
                            </div>
                        )}
                    </>
                );
            case 'tennis':
                return (
                    <>
                        {game.tournament && (
                            <div className="text-xs font-medium text-green-600 mb-1 flex items-center">
                                <FaTrophy className="mr-1" size={10} />
                                {game.tournament.name} • {game.tournament.category}
                            </div>
                        )}
                        {game.tournament?.round && (
                            <div className="text-xs text-gray-500 mb-1">
                                {game.tournament.round}
                            </div>
                        )}
                        {game.tournament?.surface && (
                            <div className="text-xs text-gray-500 mb-1 flex items-center">
                                <FaTable className="mr-1" size={10} />
                                {game.tournament.surface} Court
                                {game.sets && <span className="ml-2">• Best of {game.sets}</span>}
                            </div>
                        )}
                        {game.isWomens !== undefined && (
                            <div className="text-xs text-gray-500 mb-1">
                                {game.isWomens ? "Women&apos;s" : "Men&apos;s"} Singles
                            </div>
                        )}
                    </>
                );
            default:
                return null;
        }
    };

    // Render team affiliation details (conference/division/league)
    const renderTeamAffiliation = (team: Game['homeTeam'] | Game['awayTeam']) => {
        const affiliations = [];

        if (team.conference) {
            affiliations.push(team.conference);
        }

        if (team.division) {
            affiliations.push(team.division);
        }

        if (team.league && sportType !== 'basketball' && sportType !== 'football') {
            // Only show league for baseball and soccer as NBA/NFL are implied
            affiliations.push(team.league);
        }

        if (team.country && sportType === 'tennis') {
            // For tennis, show the country
            affiliations.push(team.country);
        }

        if (affiliations.length === 0) {
            return null;
        }

        // Get sport-specific color for the affiliation tag
        const getAffiliationColor = () => {
            switch (sportType) {
                case 'basketball':
                    return 'bg-orange-50 text-orange-700';
                case 'baseball':
                    return 'bg-blue-50 text-blue-700';
                case 'football':
                    return 'bg-green-50 text-green-700';
                case 'soccer':
                    return 'bg-purple-50 text-purple-700';
                case 'tennis':
                    return 'bg-green-50 text-green-700';
                default:
                    return 'bg-gray-50 text-gray-700';
            }
        };

        return (
            <div className={`text-xs px-2 py-0.5 rounded-full flex items-center ${getAffiliationColor()}`}>
                <FaUsers className="mr-1" size={10} />
                {affiliations.join(' • ')}
            </div>
        );
    };

    // For tennis, we want to show player names instead of team names
    const renderTeamOrPlayerName = (team: Game['homeTeam'] | Game['awayTeam'], isHome: boolean) => {
        if (sportType === 'tennis' && game.keyMatchups && game.keyMatchups.length > 0) {
            const matchup = game.keyMatchups[0];
            if (matchup.isPlayerMatchup && matchup.player1 && matchup.player2) {
                const player = isHome ? matchup.player1 : matchup.player2;
                return (
                    <>
                        <div className="text-sm text-gray-500">{team.name}</div>
                        <div className="font-bold">{player.name}</div>
                        {player.ranking && (
                            <div className="text-xs text-gray-500">
                                World Ranking: #{player.ranking}
                            </div>
                        )}
                    </>
                );
            }
        }

        return (
            <>
                <div className="text-sm text-gray-500">{team.city}</div>
                <div className="font-bold">{team.name}</div>
            </>
        );
    };

    return (
        <motion.div
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
            whileHover={{ y: -4, boxShadow: '0 12px 20px -5px rgba(0, 0, 0, 0.1)' }}
            transition={{ duration: 0.2 }}
        >
            <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        {renderSportSpecificDetails()}
                        <div className="flex items-center text-sm text-gray-500 mb-1">
                            <FaClock className="mr-1 text-gray-400" />
                            <span>{formatGameTime(game.time)}</span>
                            <span className="mx-2">•</span>
                            <FaMapMarkerAlt className="mr-1 text-gray-400" />
                            <span>{game.arena}</span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        {getSportIcon()}
                        {game.isImportant && (
                            <div className="ml-2 bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                                <FaStar className="mr-1" />
                                Important
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        <Image
                            src={game.awayTeam.logo}
                            alt={game.awayTeam.name}
                            width={48}
                            height={48}
                            className="object-contain"
                        />
                        <div className="ml-3">
                            {renderTeamOrPlayerName(game.awayTeam, false)}
                            {renderTeamAffiliation(game.awayTeam)}
                        </div>
                    </div>
                    <div className="text-center px-4">
                        <div className="text-xs font-medium text-gray-500 mb-1">
                            {sportType === 'tennis' ? 'VS' : 'AT'}
                        </div>
                        <div className={`w-8 h-8 rounded-full ${getSportColor()} flex items-center justify-center text-white font-bold text-xs`}>
                            {sportType === 'tennis' ? 'VS' : 'AT'}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="mr-3 text-right">
                            {renderTeamOrPlayerName(game.homeTeam, true)}
                            <div className="flex justify-end">
                                {renderTeamAffiliation(game.homeTeam)}
                            </div>
                        </div>
                        <Image
                            src={game.homeTeam.logo}
                            alt={game.homeTeam.name}
                            width={48}
                            height={48}
                            className="object-contain"
                        />
                    </div>
                </div>

                {game.isImportant && game.importanceReason && (
                    <div className="mt-4">
                        <div className="flex flex-wrap gap-1 mb-2">
                            {game.importanceReason.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className={`text-xs px-2 py-0.5 rounded-full ${getTagColor(tag)}`}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="text-sm text-gray-700 font-medium">
                            {game.importanceReason.shortDescription}
                        </div>
                        <button
                            onClick={toggleExpanded}
                            className="mt-2 text-xs flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                        >
                            <FaInfoCircle className="mr-1" />
                            {expanded ? 'Show less' : 'More details'}
                            {expanded ? <FaChevronUp className="ml-1" /> : <FaChevronDown className="ml-1" />}
                        </button>
                    </div>
                )}

                {expanded && game.isImportant && game.importanceReason && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 pt-3 border-t border-gray-100"
                    >
                        <div className="text-sm text-gray-600 whitespace-pre-line">
                            {game.importanceReason.detailedAnalysis}
                        </div>

                        {game.keyMatchups.length > 0 && (
                            <div className="mt-4">
                                <h4 className="text-sm font-semibold text-gray-800 mb-2">Key Matchups</h4>
                                <div className="space-y-3">
                                    {game.keyMatchups.map((matchup, index) => (
                                        <div key={index} className="bg-gray-50 p-3 rounded-lg">
                                            <div className="font-medium text-sm text-gray-800 mb-1">{matchup.title}</div>
                                            <div className="text-xs text-gray-600">{matchup.description}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default GameCard; 