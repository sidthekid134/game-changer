import { GamesResponse } from '../types';
import { fetchUpcomingGamesMock } from './sportsApi';

// This is a placeholder implementation
// In a real application, this would fetch real football data
export const fetchUpcomingFootballGames = async (): Promise<GamesResponse> => {
    return fetchUpcomingGamesMock('football');
}; 