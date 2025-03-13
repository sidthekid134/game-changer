import { Player } from '../types';

// Mock players data for demonstration purposes
const mockPlayers: Record<string, Player[]> = {
    // Atlanta Hawks players
    '1': [
        {
            id: 101,
            name: 'Trae Young',
            position: 'PG',
            teamId: 1,
            isAllStar: true,
            photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1629027.png',
            stats: {
                ppg: 26.8,
                rpg: 3.1,
                apg: 10.2,
                spg: 1.1,
                fg_pct: 0.431,
                fg3_pct: 0.371
            }
        },
        {
            id: 102,
            name: 'Dejounte Murray',
            position: 'SG',
            teamId: 1,
            photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1627749.png',
            stats: {
                ppg: 21.5,
                rpg: 5.3,
                apg: 6.4,
                spg: 1.5,
                fg_pct: 0.455,
                fg3_pct: 0.362
            }
        }
    ],

    // Boston Celtics players
    '2': [
        {
            id: 201,
            name: 'Jayson Tatum',
            position: 'SF',
            teamId: 2,
            isAllStar: true,
            photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1628369.png',
            stats: {
                ppg: 27.1,
                rpg: 8.2,
                apg: 4.7,
                spg: 1.0,
                fg_pct: 0.465,
                fg3_pct: 0.375
            },
            streak: {
                type: 'scoring',
                count: 5,
                description: 'scoring 25+ points in 5 consecutive games'
            }
        },
        {
            id: 202,
            name: 'Jaylen Brown',
            position: 'SG',
            teamId: 2,
            isAllStar: true,
            photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1627759.png',
            stats: {
                ppg: 23.5,
                rpg: 5.6,
                apg: 3.5,
                spg: 1.2,
                fg_pct: 0.492,
                fg3_pct: 0.356
            }
        }
    ]
};

// Get all players for a specific team
export const getPlayersForTeam = (teamId: string): Player[] => {
    return mockPlayers[teamId] || [];
};

// Get star player from a team (for matchup purposes)
export const getStarPlayerFromTeam = (teamId: string): Player | undefined => {
    const teamPlayers = mockPlayers[teamId] || [];
    return teamPlayers.find(player => player.isAllStar);
};

// Get players with active streaks
export const getPlayersWithStreaks = (teamId: string): Player[] => {
    const teamPlayers = mockPlayers[teamId] || [];
    return teamPlayers.filter(player => player.streak !== undefined);
}; 