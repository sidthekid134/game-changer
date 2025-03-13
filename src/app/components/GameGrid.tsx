import React, { useState } from 'react';
import GameCard from './GameCard';
import { Game, SportType } from '../types';
import { format, parseISO, isToday, isTomorrow } from 'date-fns';
import { FaFilter, FaCalendarAlt, FaChevronDown, FaChevronUp, FaTrophy, FaFutbol, FaTable } from 'react-icons/fa';
import { GiTennisCourt, GiTennisBall } from 'react-icons/gi';

interface GameGridProps {
    games: Game[];
    sportType: SportType;
    competitions?: string[];
    matchdays?: number[];
    stages?: string[];
    tournaments?: string[];
    surfaces?: string[];
    rounds?: string[];
}

const GameGrid: React.FC<GameGridProps> = ({
    games,
    sportType,
    competitions = [],
    matchdays = [],
    stages = [],
    tournaments = [],
    surfaces = [],
    rounds = []
}) => {
    const [showFilters, setShowFilters] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
    const [selectedPlayoffRound, setSelectedPlayoffRound] = useState<string | null>(null);
    const [selectedCompetition, setSelectedCompetition] = useState<string | null>(null);
    const [selectedMatchday, setSelectedMatchday] = useState<number | null>(null);
    const [selectedStage, setSelectedStage] = useState<string | null>(null);
    const [selectedTournament, setSelectedTournament] = useState<string | null>(null);
    const [selectedSurface, setSelectedSurface] = useState<string | null>(null);
    const [selectedRound, setSelectedRound] = useState<string | null>(null);
    const [showImportantOnly, setShowImportantOnly] = useState(false);
    const [showWomensOnly, setShowWomensOnly] = useState<boolean | null>(null);

    // Get unique dates from games
    const dates = [...new Set(games.map(game => game.date))].sort();

    // Get unique weeks from games (for basketball and football)
    const weeks = [...new Set(games
        .filter(game => game.week !== undefined)
        .map(game => game.week as number))
    ].sort((a, b) => a - b);

    // Get unique playoff rounds from games
    const playoffRounds = [...new Set(games
        .filter(game => game.playoffRound !== undefined)
        .map(game => game.playoffRound as string))
    ];

    // Filter games based on selected filters
    const filteredGames = games.filter(game => {
        // Filter by date
        if (selectedDate && game.date !== selectedDate) {
            return false;
        }

        // Filter by week (for basketball and football)
        if (selectedWeek !== null && game.week !== selectedWeek) {
            return false;
        }

        // Filter by playoff round
        if (selectedPlayoffRound && game.playoffRound !== selectedPlayoffRound) {
            return false;
        }

        // Filter by competition (for soccer)
        if (selectedCompetition && game.competition !== selectedCompetition) {
            return false;
        }

        // Filter by matchday (for soccer)
        if (selectedMatchday !== null && game.matchday !== selectedMatchday) {
            return false;
        }

        // Filter by stage (for soccer)
        if (selectedStage && game.stage !== selectedStage) {
            return false;
        }

        // Filter by tournament (for tennis)
        if (selectedTournament && game.tournament?.name !== selectedTournament) {
            return false;
        }

        // Filter by surface (for tennis)
        if (selectedSurface && game.tournament?.surface !== selectedSurface) {
            return false;
        }

        // Filter by round (for tennis)
        if (selectedRound && game.tournament?.round !== selectedRound) {
            return false;
        }

        // Filter by gender (for tennis)
        if (showWomensOnly !== null && game.isWomens !== showWomensOnly) {
            return false;
        }

        // Filter by importance
        if (showImportantOnly && !game.isImportant) {
            return false;
        }

        return true;
    });

    // Group games by date
    const gamesByDate = filteredGames.reduce((acc, game) => {
        if (!acc[game.date]) {
            acc[game.date] = [];
        }
        acc[game.date].push(game);
        return acc;
    }, {} as Record<string, Game[]>);

    // Sort dates
    const sortedDates = Object.keys(gamesByDate).sort((a, b) => {
        return new Date(a).getTime() - new Date(b).getTime();
    });

    // Format date for display
    const formatDateForDisplay = (dateString: string) => {
        const date = parseISO(dateString);
        if (isToday(date)) {
            return 'Today';
        } else if (isTomorrow(date)) {
            return 'Tomorrow';
        } else {
            return format(date, 'EEEE, MMMM d');
        }
    };

    // Toggle filters
    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    // Reset all filters
    const resetFilters = () => {
        setSelectedDate(null);
        setSelectedWeek(null);
        setSelectedPlayoffRound(null);
        setSelectedCompetition(null);
        setSelectedMatchday(null);
        setSelectedStage(null);
        setSelectedTournament(null);
        setSelectedSurface(null);
        setSelectedRound(null);
        setShowWomensOnly(null);
        setShowImportantOnly(false);
    };

    // Render sport-specific filters
    const renderSportSpecificFilters = () => {
        switch (sportType) {
            case 'basketball':
            case 'football':
                return (
                    <>
                        {weeks.length > 0 && (
                            <div className="mb-4">
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Week</h3>
                                <div className="flex flex-wrap gap-2">
                                    {weeks.map((week) => (
                                        <button
                                            key={week}
                                            onClick={() => setSelectedWeek(selectedWeek === week ? null : week)}
                                            className={`px-3 py-1 text-sm rounded-full ${selectedWeek === week
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                                }`}
                                        >
                                            Week {week}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {playoffRounds.length > 0 && (
                            <div className="mb-4">
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Playoff Round</h3>
                                <div className="flex flex-wrap gap-2">
                                    {playoffRounds.map((round) => (
                                        <button
                                            key={round}
                                            onClick={() => setSelectedPlayoffRound(selectedPlayoffRound === round ? null : round)}
                                            className={`px-3 py-1 text-sm rounded-full ${selectedPlayoffRound === round
                                                ? 'bg-amber-600 text-white'
                                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                                }`}
                                        >
                                            {round}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                );
            case 'baseball':
                return (
                    <>
                        {playoffRounds.length > 0 && (
                            <div className="mb-4">
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Playoff Round</h3>
                                <div className="flex flex-wrap gap-2">
                                    {playoffRounds.map((round) => (
                                        <button
                                            key={round}
                                            onClick={() => setSelectedPlayoffRound(selectedPlayoffRound === round ? null : round)}
                                            className={`px-3 py-1 text-sm rounded-full ${selectedPlayoffRound === round
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                                }`}
                                        >
                                            {round}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                );
            case 'soccer':
                return (
                    <>
                        {competitions.length > 0 && (
                            <div className="mb-4">
                                <h3 className="text-sm font-medium text-gray-700 mb-2">
                                    <FaTrophy className="inline-block mr-1 text-amber-500" />
                                    Competition
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {competitions.map((competition) => (
                                        <button
                                            key={competition}
                                            onClick={() => setSelectedCompetition(selectedCompetition === competition ? null : competition)}
                                            className={`px-3 py-1 text-sm rounded-full ${selectedCompetition === competition
                                                ? 'bg-purple-600 text-white'
                                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                                }`}
                                        >
                                            {competition}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {matchdays.length > 0 && (
                            <div className="mb-4">
                                <h3 className="text-sm font-medium text-gray-700 mb-2">
                                    <FaFutbol className="inline-block mr-1 text-purple-500" />
                                    Matchday
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {matchdays.map((matchday) => (
                                        <button
                                            key={matchday}
                                            onClick={() => setSelectedMatchday(selectedMatchday === matchday ? null : matchday)}
                                            className={`px-3 py-1 text-sm rounded-full ${selectedMatchday === matchday
                                                ? 'bg-purple-600 text-white'
                                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                                }`}
                                        >
                                            Matchday {matchday}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {stages.length > 0 && (
                            <div className="mb-4">
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Stage</h3>
                                <div className="flex flex-wrap gap-2">
                                    {stages.map((stage) => (
                                        <button
                                            key={stage}
                                            onClick={() => setSelectedStage(selectedStage === stage ? null : stage)}
                                            className={`px-3 py-1 text-sm rounded-full ${selectedStage === stage
                                                ? 'bg-purple-600 text-white'
                                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                                }`}
                                        >
                                            {stage}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                );
            case 'tennis':
                return (
                    <>
                        {tournaments.length > 0 && (
                            <div className="mb-4">
                                <h3 className="text-sm font-medium text-gray-700 mb-2">
                                    <FaTrophy className="inline-block mr-1 text-amber-500" />
                                    Tournament
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {tournaments.map((tournament) => (
                                        <button
                                            key={tournament}
                                            onClick={() => setSelectedTournament(selectedTournament === tournament ? null : tournament)}
                                            className={`px-3 py-1 text-sm rounded-full ${selectedTournament === tournament
                                                ? 'bg-green-600 text-white'
                                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                                }`}
                                        >
                                            {tournament}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {surfaces.length > 0 && (
                            <div className="mb-4">
                                <h3 className="text-sm font-medium text-gray-700 mb-2">
                                    <FaTable className="inline-block mr-1 text-green-500" />
                                    Surface
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {surfaces.map((surface) => (
                                        <button
                                            key={surface}
                                            onClick={() => setSelectedSurface(selectedSurface === surface ? null : surface)}
                                            className={`px-3 py-1 text-sm rounded-full ${selectedSurface === surface
                                                ? 'bg-green-600 text-white'
                                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                                }`}
                                        >
                                            {surface}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {rounds.length > 0 && (
                            <div className="mb-4">
                                <h3 className="text-sm font-medium text-gray-700 mb-2">
                                    <GiTennisCourt className="inline-block mr-1 text-green-600" />
                                    Round
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {rounds.map((round) => (
                                        <button
                                            key={round}
                                            onClick={() => setSelectedRound(selectedRound === round ? null : round)}
                                            className={`px-3 py-1 text-sm rounded-full ${selectedRound === round
                                                ? 'bg-green-600 text-white'
                                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                                }`}
                                        >
                                            {round}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="mb-4">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">
                                <GiTennisBall className="inline-block mr-1 text-green-600" />
                                Category
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setShowWomensOnly(showWomensOnly === true ? null : true)}
                                    className={`px-3 py-1 text-sm rounded-full ${showWomensOnly === true
                                        ? 'bg-pink-500 text-white'
                                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                        }`}
                                >
                                    Women's
                                </button>
                                <button
                                    onClick={() => setShowWomensOnly(showWomensOnly === false ? null : false)}
                                    className={`px-3 py-1 text-sm rounded-full ${showWomensOnly === false
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                        }`}
                                >
                                    Men's
                                </button>
                            </div>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                        {filteredGames.length} {filteredGames.length === 1 ? 'Game' : sportType === 'tennis' ? 'Matches' : 'Games'} Found
                    </h2>
                    <div className="flex space-x-2">
                        <button
                            onClick={toggleFilters}
                            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            <FaFilter className="mr-2" />
                            Filters
                            {showFilters ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
                        </button>
                        {(selectedDate || selectedWeek || selectedPlayoffRound || selectedCompetition ||
                            selectedMatchday || selectedStage || selectedTournament || selectedSurface ||
                            selectedRound || showWomensOnly !== null || showImportantOnly) && (
                                <button
                                    onClick={resetFilters}
                                    className="px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                                >
                                    Clear Filters
                                </button>
                            )}
                    </div>
                </div>

                {showFilters && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
                        <div className="mb-4">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">
                                <FaCalendarAlt className="inline-block mr-1 text-blue-500" />
                                Date
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {dates.map((date) => (
                                    <button
                                        key={date}
                                        onClick={() => setSelectedDate(selectedDate === date ? null : date)}
                                        className={`px-3 py-1 text-sm rounded-full ${selectedDate === date
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                            }`}
                                    >
                                        {formatDateForDisplay(date)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {renderSportSpecificFilters()}

                        <div className="mb-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    checked={showImportantOnly}
                                    onChange={() => setShowImportantOnly(!showImportantOnly)}
                                    className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">Show important {sportType === 'tennis' ? 'matches' : 'games'} only</span>
                            </label>
                        </div>
                    </div>
                )}
            </div>

            {filteredGames.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">No {sportType === 'tennis' ? 'matches' : 'games'} found</h3>
                    <p className="text-gray-600">Try adjusting your filters to see more {sportType === 'tennis' ? 'matches' : 'games'}.</p>
                </div>
            ) : (
                sortedDates.map((date) => (
                    <div key={date} className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-800 flex items-center">
                            <FaCalendarAlt className="mr-2 text-blue-500" />
                            {formatDateForDisplay(date)}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {gamesByDate[date].map((game) => (
                                <GameCard key={game.id} game={game} sportType={sportType} />
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default GameGrid; 