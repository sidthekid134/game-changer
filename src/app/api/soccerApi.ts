import { GamesResponse } from '../types';
import { fetchUpcomingGamesMock } from './sportsApi';

// This is a placeholder implementation
// In a real application, this would fetch real soccer data
export const fetchUpcomingSoccerGames = async (): Promise<GamesResponse> => {
    return fetchUpcomingGamesMock('soccer');
}; 