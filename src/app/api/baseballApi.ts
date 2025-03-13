import { GamesResponse } from '../types';
import { fetchUpcomingGamesMock } from './sportsApi';

// This is a placeholder implementation
// In a real application, this would fetch real baseball data
export const fetchUpcomingBaseballGames = async (): Promise<GamesResponse> => {
    return fetchUpcomingGamesMock('baseball');
}; 