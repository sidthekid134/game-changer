import { format, addDays } from 'date-fns';
import { Game, Team, ImportanceTag, KeyMatchup, Player, GamesResponse, SportType } from '../types';
import { getPlayersWithStreaks, getStarPlayerFromTeam } from './mockPlayers';

// This is a mock API since we don't have a real NBA API to use
// In a real-world scenario, we'd connect to an actual NBA API

// NBA Teams with logos
const nbaTeams: Record<string, Team> = {
    'ATL': {
        id: 1,
        name: 'Hawks',
        abbreviation: 'ATL',
        logo: 'https://cdn.nba.com/logos/nba/1610612737/global/L/logo.svg',
        city: 'Atlanta',
        conference: 'Eastern',
        division: 'Southeast'
    },
    'BOS': {
        id: 2,
        name: 'Celtics',
        abbreviation: 'BOS',
        logo: 'https://cdn.nba.com/logos/nba/1610612738/global/L/logo.svg',
        city: 'Boston',
        conference: 'Eastern',
        division: 'Atlantic'
    },
    'BKN': {
        id: 3,
        name: 'Nets',
        abbreviation: 'BKN',
        logo: 'https://cdn.nba.com/logos/nba/1610612751/global/L/logo.svg',
        city: 'Brooklyn',
        conference: 'Eastern',
        division: 'Atlantic'
    },
    'CHA': {
        id: 4,
        name: 'Hornets',
        abbreviation: 'CHA',
        logo: 'https://cdn.nba.com/logos/nba/1610612766/global/L/logo.svg',
        city: 'Charlotte',
        conference: 'Eastern',
        division: 'Southeast'
    },
    'CHI': {
        id: 5,
        name: 'Bulls',
        abbreviation: 'CHI',
        logo: 'https://cdn.nba.com/logos/nba/1610612741/global/L/logo.svg',
        city: 'Chicago',
        conference: 'Eastern',
        division: 'Central'
    },
    'CLE': {
        id: 6,
        name: 'Cavaliers',
        abbreviation: 'CLE',
        logo: 'https://cdn.nba.com/logos/nba/1610612739/global/L/logo.svg',
        city: 'Cleveland',
        conference: 'Eastern',
        division: 'Central'
    },
    'DAL': {
        id: 7,
        name: 'Mavericks',
        abbreviation: 'DAL',
        logo: 'https://cdn.nba.com/logos/nba/1610612742/global/L/logo.svg',
        city: 'Dallas',
        conference: 'Western',
        division: 'Southwest'
    },
    'DEN': {
        id: 8,
        name: 'Nuggets',
        abbreviation: 'DEN',
        logo: 'https://cdn.nba.com/logos/nba/1610612743/global/L/logo.svg',
        city: 'Denver',
        conference: 'Western',
        division: 'Northwest'
    },
    'GSW': {
        id: 9,
        name: 'Warriors',
        abbreviation: 'GSW',
        logo: 'https://cdn.nba.com/logos/nba/1610612744/global/L/logo.svg',
        city: 'Golden State',
        conference: 'Western',
        division: 'Pacific'
    },
    'LAL': {
        id: 10,
        name: 'Lakers',
        abbreviation: 'LAL',
        logo: 'https://cdn.nba.com/logos/nba/1610612747/global/L/logo.svg',
        city: 'Los Angeles',
        conference: 'Western',
        division: 'Pacific'
    }
};

// Mock data for generating games
const arenas: Record<string, string> = {
    'ATL': 'State Farm Arena',
    'BOS': 'TD Garden',
    'BKN': 'Barclays Center',
    'CHA': 'Spectrum Center',
    'CHI': 'United Center',
    'CLE': 'Rocket Mortgage FieldHouse',
    'DAL': 'American Airlines Center',
    'DEN': 'Ball Arena',
    'GSW': 'Chase Center',
    'LAL': 'Crypto.com Arena'
};

// MVP candidates for the current season
const mvpCandidates = [
    'Nikola Jokic',
    'Joel Embiid',
    'Giannis Antetokounmpo',
    'Luka Doncic',
    'Shai Gilgeous-Alexander'
];

// Generate mock games with realistic data
const generateMockGames = (): Game[] => {
    const games: Game[] = [];
    const today = new Date();

    // Generate games for the next 14 days
    for (let i = 0; i < 14; i++) {
        const gameDate = addDays(today, i);
        const formattedDate = format(gameDate, 'yyyy-MM-dd');

        // Determine if this is a playoff game
        const isPlayoff = i > 10; // Just for demonstration
        const playoffRound = isPlayoff ? 'First Round' : undefined;
        const week = !isPlayoff ? Math.ceil((i + 1) / 7) : undefined;

        // Generate 2-4 games per day
        const gamesPerDay = Math.floor(Math.random() * 3) + 2;

        for (let j = 0; j < gamesPerDay; j++) {
            // Randomly select teams
            const teamAbbreviations = Object.keys(nbaTeams);
            const homeTeamAbbr = teamAbbreviations[Math.floor(Math.random() * teamAbbreviations.length)];
            let awayTeamAbbr;
            do {
                awayTeamAbbr = teamAbbreviations[Math.floor(Math.random() * teamAbbreviations.length)];
            } while (awayTeamAbbr === homeTeamAbbr);

            const homeTeam = nbaTeams[homeTeamAbbr];
            const awayTeam = nbaTeams[awayTeamAbbr];

            // Get players with streaks for importance calculation
            const homePlayersWithStreaks = getPlayersWithStreaks(homeTeam.id.toString());
            const awayPlayersWithStreaks = getPlayersWithStreaks(awayTeam.id.toString());

            // Get star players for matchups
            const homeStarPlayer = getStarPlayerFromTeam(homeTeam.id.toString());
            const awayStarPlayer = getStarPlayerFromTeam(awayTeam.id.toString());

            // Determine if this game is important (for demo purposes, make ~30% of games important)
            const isImportant = Math.random() < 0.3;

            // Generate importance reason if the game is important
            const importanceReason = isImportant
                ? generateImportanceReason(homeTeam, awayTeam, homePlayersWithStreaks, awayPlayersWithStreaks)
                : undefined;

            // Generate key matchups
            const keyMatchups: KeyMatchup[] = [];

            // Star player matchup if both teams have star players
            if (homeStarPlayer && awayStarPlayer) {
                keyMatchups.push({
                    title: `${homeStarPlayer.name} vs. ${awayStarPlayer.name}`,
                    description: `Two of the league's premier ${homeStarPlayer.position}s face off in what should be an exciting matchup.`,
                    player1: homeStarPlayer,
                    player2: awayStarPlayer,
                    isPlayerMatchup: true
                });
            }

            // Team matchup based on conference standings
            keyMatchups.push({
                title: `${homeTeam.city} vs ${awayTeam.city}`,
                description: `${homeTeam.conference === awayTeam.conference ? 'Intra' : 'Inter'}-conference matchup with potential playoff implications.`,
                isPlayerMatchup: false
            });

            // Random game time between 7:00 PM and 10:30 PM
            const hours = Math.floor(Math.random() * 4) + 19; // 7 PM to 10 PM
            const minutes = Math.random() < 0.5 ? '00' : '30';
            const gameTime = `${hours}:${minutes}`;

            games.push({
                id: games.length + 1,
                sportType: 'basketball' as SportType,
                date: formattedDate,
                time: gameTime,
                homeTeam,
                awayTeam,
                location: `${homeTeam.city}, ${getStateFromTeam(homeTeam.abbreviation)}`,
                arena: arenas[homeTeam.abbreviation] || `${homeTeam.city} Arena`,
                isImportant,
                importanceReason,
                keyMatchups,
                week,
                playoffRound
            });
        }
    }

    return games;
};

// Helper function to get state from team abbreviation
const getStateFromTeam = (abbreviation: string): string => {
    // This would be a lookup in a real application
    const states: Record<string, string> = {
        'ATL': 'GA',
        'BOS': 'MA',
        // Add more states as needed
    };

    return states[abbreviation] || 'XX';
};

// Generate importance reason with tags and descriptions
const generateImportanceReason = (
    homeTeam: Team,
    awayTeam: Team,
    homePlayersWithStreaks: Player[] = [],
    awayPlayersWithStreaks: Player[] = []
) => {
    const tags: ImportanceTag[] = [];
    let shortDescription = '';
    let detailedAnalysis = '';

    // Get star players for potential matchups
    const homeStarPlayer = getStarPlayerFromTeam(homeTeam.id.toString());
    const awayStarPlayer = getStarPlayerFromTeam(awayTeam.id.toString());

    // Randomly select importance factors
    const importanceFactors = [
        'playoff',
        'rivalry',
        'star',
        'streak',
        'mvp'
    ];

    // Randomly select 1-3 importance factors
    const numFactors = Math.floor(Math.random() * 3) + 1;
    const selectedFactors: string[] = [];

    for (let i = 0; i < numFactors; i++) {
        const factor = importanceFactors[Math.floor(Math.random() * importanceFactors.length)];
        if (!selectedFactors.includes(factor)) {
            selectedFactors.push(factor);
        }
    }

    // Apply selected factors
    if (selectedFactors.includes('playoff')) {
        tags.push('Playoff Implications');
    }

    if (selectedFactors.includes('rivalry')) {
        tags.push('Rivalry Game');
    }

    if (selectedFactors.includes('star') && homeStarPlayer && awayStarPlayer) {
        tags.push('Star Matchup');
        shortDescription = `${homeStarPlayer.name} and ${awayStarPlayer.name} face off in a battle of elite talent.`;
        detailedAnalysis = getStarMatchupDetailedAnalysis(homeTeam, awayTeam, homeStarPlayer, awayStarPlayer);
    }

    if (selectedFactors.includes('streak') &&
        (homePlayersWithStreaks.length > 0 || awayPlayersWithStreaks.length > 0)) {
        tags.push('Player Streak');
        shortDescription = getPlayerStreakShortDescription(homePlayersWithStreaks, awayPlayersWithStreaks);
        detailedAnalysis = getPlayerStreakDetailedAnalysis(
            homePlayersWithStreaks,
            awayPlayersWithStreaks,
            homeTeam,
            awayTeam
        );
    }

    if (selectedFactors.includes('mvp') &&
        ((homeStarPlayer && mvpCandidates.includes(homeStarPlayer.name)) ||
            (awayStarPlayer && mvpCandidates.includes(awayStarPlayer.name)))) {
        tags.push('MVP Candidate');
        shortDescription = getMvpCandidateShortDescription(homeStarPlayer, awayStarPlayer, mvpCandidates);
        detailedAnalysis = getMvpCandidateDetailedAnalysis(
            homeStarPlayer,
            awayStarPlayer,
            mvpCandidates,
            homeTeam,
            awayTeam
        );
    }

    // Default description if none was set
    if (!shortDescription) {
        shortDescription = `Important matchup between ${homeTeam.city} and ${awayTeam.city} with playoff implications.`;
    }

    // Default analysis if none was set
    if (!detailedAnalysis) {
        detailedAnalysis = `This game between the ${homeTeam.city} ${homeTeam.name} and the ${awayTeam.city} ${awayTeam.name} could have significant implications for the ${homeTeam.conference === awayTeam.conference ? 'conference' : 'league'} standings.`;
    }

    return {
        tags,
        shortDescription,
        detailedAnalysis
    };
};

// Helper functions for generating descriptions
const getPlayerStreakShortDescription = (homePlayersWithStreaks: Player[], awayPlayersWithStreaks: Player[]): string => {
    if (homePlayersWithStreaks.length > 0) {
        return `${homePlayersWithStreaks[0].name} is on a hot streak with ${homePlayersWithStreaks[0].streak?.description}.`;
    } else if (awayPlayersWithStreaks.length > 0) {
        return `${awayPlayersWithStreaks[0].name} is on a hot streak with ${awayPlayersWithStreaks[0].streak?.description}.`;
    }
    return '';
};

const getMvpCandidateShortDescription = (
    homeStarPlayer: Player | undefined,
    awayStarPlayer: Player | undefined,
    mvpCandidates: string[]
): string => {
    if (homeStarPlayer && mvpCandidates.includes(homeStarPlayer.name)) {
        return `MVP candidate ${homeStarPlayer.name} looks to strengthen his case.`;
    } else if (awayStarPlayer && mvpCandidates.includes(awayStarPlayer.name)) {
        return `MVP candidate ${awayStarPlayer.name} looks to strengthen his case.`;
    }
    return '';
};

const getStarMatchupDetailedAnalysis = (
    homeTeam: Team,
    awayTeam: Team,
    homeStarPlayer: Player | undefined,
    awayStarPlayer: Player | undefined
): string => {
    if (!homeStarPlayer || !awayStarPlayer) return '';

    const homeStats = homeStarPlayer.stats;
    const awayStats = awayStarPlayer.stats;

    if (!homeStats || !awayStats) return '';

    return `This game features a premier matchup between ${homeStarPlayer.name} (${homeStats.ppg} PPG, ${homeStats.rpg} RPG, ${homeStats.apg} APG) and ${awayStarPlayer.name} (${awayStats.ppg} PPG, ${awayStats.rpg} RPG, ${awayStats.apg} APG). 
    
Both players are having outstanding seasons and their head-to-head battles have been must-watch TV. ${homeStarPlayer.name} leads the ${homeTeam.name} with his scoring and playmaking, while ${awayStarPlayer.name} has been the focal point of the ${awayTeam.name}'s offense.

Basketball fans won't want to miss this showdown between two of the league's brightest stars.`;
};

const getPlayerStreakDetailedAnalysis = (
    homePlayersWithStreaks: Player[],
    awayPlayersWithStreaks: Player[],
    homeTeam: Team,
    awayTeam: Team
): string => {
    let analysis = '';

    if (homePlayersWithStreaks.length > 0) {
        const player = homePlayersWithStreaks[0];
        analysis += `${player.name} of the ${homeTeam.city} ${homeTeam.name} is on an impressive streak, ${player.streak?.description}. 
        
This kind of consistency has been a key factor in the team's recent performances, and fans will be watching to see if he can extend this run against the ${awayTeam.name}.`;
    }

    if (awayPlayersWithStreaks.length > 0) {
        if (analysis) analysis += '\n\n';
        const player = awayPlayersWithStreaks[0];
        analysis += `${player.name} of the ${awayTeam.city} ${awayTeam.name} has been on fire lately, ${player.streak?.description}. 
        
The ${homeTeam.name} will need to focus their defensive efforts on containing him if they want to secure a win at home.`;
    }

    return analysis;
};

const getMvpCandidateDetailedAnalysis = (
    homeStarPlayer: Player | undefined,
    awayStarPlayer: Player | undefined,
    mvpCandidates: string[],
    homeTeam: Team,
    awayTeam: Team
): string => {
    let analysis = '';

    if (homeStarPlayer && mvpCandidates.includes(homeStarPlayer.name)) {
        analysis += `${homeStarPlayer.name} has been in the MVP conversation all season, showcasing an elite level of play that has propelled the ${homeTeam.city} ${homeTeam.name} in the standings. 
        
With averages of ${homeStarPlayer.stats?.ppg} points, ${homeStarPlayer.stats?.rpg} rebounds, and ${homeStarPlayer.stats?.apg} assists per game, he's demonstrating the all-around excellence that MVP voters look for. This game against the ${awayTeam.name} provides another opportunity for him to strengthen his case on a big stage.`;
    }

    if (awayStarPlayer && mvpCandidates.includes(awayStarPlayer.name)) {
        if (analysis) analysis += '\n\n';
        analysis += `${awayStarPlayer.name} has been making a compelling MVP case this season, leading the ${awayTeam.city} ${awayTeam.name} with exceptional performances night after night. 
        
Averaging ${awayStarPlayer.stats?.ppg} points, ${awayStarPlayer.stats?.rpg} rebounds, and ${awayStarPlayer.stats?.apg} assists per game, he's been the engine driving his team's success. A strong showing against the ${homeTeam.name} would add another impressive performance to his MVP resume.`;
    }

    return analysis;
};

// API function to fetch upcoming games
export const fetchUpcomingBasketballGames = async (): Promise<GamesResponse> => {
    // In a real application, this would make an API call
    // For this demo, we'll generate mock data

    const games = generateMockGames();

    return {
        sportType: 'basketball',
        games
    };
}; 