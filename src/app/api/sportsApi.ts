import { GamesResponse, SportType } from '../types';
import { fetchUpcomingBasketballGames } from './basketballApi';
import { fetchUpcomingBaseballGames } from './baseballApi';
import { fetchUpcomingFootballGames } from './footballApi';
import { fetchUpcomingSoccerGames } from './soccerApi';
import { fetchUpcomingTennisMatches } from './tennisApi';

// This is a facade that will route to the appropriate sport-specific API
export const fetchUpcomingGames = async (sportType: SportType): Promise<GamesResponse> => {
    switch (sportType) {
        case 'basketball':
            return fetchUpcomingBasketballGames();
        case 'baseball':
            return fetchUpcomingBaseballGames();
        case 'football':
            return fetchUpcomingFootballGames();
        case 'soccer':
            return fetchUpcomingSoccerGames();
        case 'tennis':
            return fetchUpcomingTennisMatches();
        default:
            throw new Error(`Unsupported sport type: ${sportType}`);
    }
};

// Mock implementation for sports that aren't fully implemented yet
export const fetchUpcomingGamesMock = async (sportType: SportType): Promise<GamesResponse> => {
    // This is a placeholder that returns empty data
    // In a real implementation, you would fetch data from an API
    return {
        sportType,
        games: []
    };
}; 