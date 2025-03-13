import { format, addDays } from 'date-fns';
import { Game, Team, ImportanceTag, KeyMatchup, Player, GamesResponse, SportType } from '../types';

// This is a mock API since we don't have a real tennis API to use
// In a real-world scenario, we'd connect to an actual tennis API

// Tennis players with country information
const tennisPlayers: Record<string, Player> = {
    'djokovic': {
        id: 1,
        name: 'Novak Djokovic',
        position: 'Singles',
        teamId: 1, // Serbia
        ranking: 1,
        countryCode: 'SRB',
        photoUrl: 'https://example.com/djokovic.jpg',
        stats: {
            aces: 320,
            doubleFaults: 142,
            firstServePercentage: 68.5,
            winPercentage: 82.4,
            titlesThisSeason: 3,
            careerTitles: 93
        }
    },
    'alcaraz': {
        id: 2,
        name: 'Carlos Alcaraz',
        position: 'Singles',
        teamId: 2, // Spain
        ranking: 2,
        countryCode: 'ESP',
        photoUrl: 'https://example.com/alcaraz.jpg',
        stats: {
            aces: 280,
            doubleFaults: 165,
            firstServePercentage: 65.2,
            winPercentage: 78.6,
            titlesThisSeason: 4,
            careerTitles: 12
        }
    },
    'sinner': {
        id: 3,
        name: 'Jannik Sinner',
        position: 'Singles',
        teamId: 3, // Italy
        ranking: 3,
        countryCode: 'ITA',
        photoUrl: 'https://example.com/sinner.jpg',
        stats: {
            aces: 310,
            doubleFaults: 130,
            firstServePercentage: 67.8,
            winPercentage: 80.1,
            titlesThisSeason: 5,
            careerTitles: 14
        }
    },
    'swiatek': {
        id: 4,
        name: 'Iga Swiatek',
        position: 'Singles',
        teamId: 4, // Poland
        ranking: 1,
        countryCode: 'POL',
        isWomens: true,
        photoUrl: 'https://example.com/swiatek.jpg',
        stats: {
            aces: 180,
            doubleFaults: 120,
            firstServePercentage: 66.5,
            winPercentage: 85.2,
            titlesThisSeason: 6,
            careerTitles: 20
        }
    },
    'sabalenka': {
        id: 5,
        name: 'Aryna Sabalenka',
        position: 'Singles',
        teamId: 5, // Belarus
        ranking: 2,
        countryCode: 'BLR',
        isWomens: true,
        photoUrl: 'https://example.com/sabalenka.jpg',
        stats: {
            aces: 220,
            doubleFaults: 190,
            firstServePercentage: 62.8,
            winPercentage: 76.4,
            titlesThisSeason: 3,
            careerTitles: 13
        }
    }
};

// Tennis countries (used as "teams" in our model)
const tennisCountries: Record<string, Team> = {
    'SRB': {
        id: 1,
        name: 'Serbia',
        abbreviation: 'SRB',
        logo: 'https://example.com/flags/serbia.png',
        city: 'Belgrade',
        country: 'Serbia'
    },
    'ESP': {
        id: 2,
        name: 'Spain',
        abbreviation: 'ESP',
        logo: 'https://example.com/flags/spain.png',
        city: 'Madrid',
        country: 'Spain'
    },
    'ITA': {
        id: 3,
        name: 'Italy',
        abbreviation: 'ITA',
        logo: 'https://example.com/flags/italy.png',
        city: 'Rome',
        country: 'Italy'
    },
    'POL': {
        id: 4,
        name: 'Poland',
        abbreviation: 'POL',
        logo: 'https://example.com/flags/poland.png',
        city: 'Warsaw',
        country: 'Poland'
    },
    'BLR': {
        id: 5,
        name: 'Belarus',
        abbreviation: 'BLR',
        logo: 'https://example.com/flags/belarus.png',
        city: 'Minsk',
        country: 'Belarus'
    },
    'USA': {
        id: 6,
        name: 'United States',
        abbreviation: 'USA',
        logo: 'https://example.com/flags/usa.png',
        city: 'Washington D.C.',
        country: 'United States'
    },
    'GBR': {
        id: 7,
        name: 'Great Britain',
        abbreviation: 'GBR',
        logo: 'https://example.com/flags/uk.png',
        city: 'London',
        country: 'United Kingdom'
    }
};

// Define types for tennis tournaments
type TennisSurface = 'Hard' | 'Clay' | 'Grass' | 'Carpet';
type TournamentCategory = 'Grand Slam' | 'Masters 1000' | 'ATP 500' | 'ATP 250' | 'WTA 1000' | 'WTA 500' | 'WTA 250' | 'ATP Finals';

interface TennisTournament {
    name: string;
    location: string;
    arena: string;
    surface: TennisSurface;
    category: TournamentCategory;
    month: number;
    sets: number;
    womenSets: number;
}

// Tennis tournaments with seasonal information
const tennisTournaments: TennisTournament[] = [
    {
        name: 'Australian Open',
        location: 'Melbourne, Australia',
        arena: 'Melbourne Park',
        surface: 'Hard',
        category: 'Grand Slam',
        month: 1, // January
        sets: 5, // Men's matches are best of 5 sets
        womenSets: 3 // Women's matches are best of 3 sets
    },
    {
        name: 'Roland Garros',
        location: 'Paris, France',
        arena: 'Stade Roland Garros',
        surface: 'Clay',
        category: 'Grand Slam',
        month: 5, // May-June
        sets: 5,
        womenSets: 3
    },
    {
        name: 'Wimbledon',
        location: 'London, UK',
        arena: 'All England Club',
        surface: 'Grass',
        category: 'Grand Slam',
        month: 7, // July
        sets: 5,
        womenSets: 3
    },
    {
        name: 'US Open',
        location: 'New York, USA',
        arena: 'USTA Billie Jean King National Tennis Center',
        surface: 'Hard',
        category: 'Grand Slam',
        month: 8, // August-September
        sets: 5,
        womenSets: 3
    },
    {
        name: 'ATP Finals',
        location: 'Turin, Italy',
        arena: 'Inalpi Arena',
        surface: 'Hard',
        category: 'ATP Finals',
        month: 11, // November
        sets: 3,
        womenSets: 3
    },
    {
        name: 'Miami Open',
        location: 'Miami, USA',
        arena: 'Hard Rock Stadium',
        surface: 'Hard',
        category: 'Masters 1000',
        month: 3, // March
        sets: 3,
        womenSets: 3
    },
    {
        name: 'Madrid Open',
        location: 'Madrid, Spain',
        arena: 'Caja Mágica',
        surface: 'Clay',
        category: 'Masters 1000',
        month: 4, // April-May
        sets: 3,
        womenSets: 3
    },
    {
        name: 'Cincinnati Masters',
        location: 'Cincinnati, USA',
        arena: 'Lindner Family Tennis Center',
        surface: 'Hard',
        category: 'Masters 1000',
        month: 8, // August
        sets: 3,
        womenSets: 3
    }
];

// Tournament rounds
const tournamentRounds = [
    'First Round',
    'Second Round',
    'Third Round',
    'Round of 16',
    'Quarter-finals',
    'Semi-finals',
    'Final'
];

// Generate mock tennis matches with seasonal awareness
const generateMockMatches = (): Game[] => {
    const matches: Game[] = [];
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // JavaScript months are 0-indexed

    // Find tournaments that are in season (within 2 months of current month)
    const inSeasonTournaments = tennisTournaments.filter(tournament => {
        const monthDiff = Math.abs(tournament.month - currentMonth);
        return monthDiff <= 2 || monthDiff >= 10; // Handle December-January transition
    });

    // If no tournaments are in season, pick a random one
    const activeTournaments = inSeasonTournaments.length > 0
        ? inSeasonTournaments
        : [tennisTournaments[Math.floor(Math.random() * tennisTournaments.length)]];

    // Generate matches for the next 14 days
    for (let i = 0; i < 14; i++) {
        const matchDate = addDays(today, i);
        const formattedDate = format(matchDate, 'yyyy-MM-dd');

        // Select a tournament for this day
        const tournament = activeTournaments[Math.floor(Math.random() * activeTournaments.length)];

        // Determine which round based on the day
        const roundIndex = Math.min(Math.floor(i / 2), tournamentRounds.length - 1);
        const round = tournamentRounds[roundIndex];

        // Generate 2-5 matches per day
        const matchesPerDay = Math.floor(Math.random() * 4) + 2;

        for (let j = 0; j < matchesPerDay; j++) {
            // Decide if this is a men's or women's match
            const isWomens = Math.random() > 0.5;

            // Select players based on gender
            const playerKeys = Object.keys(tennisPlayers);
            const eligiblePlayers = playerKeys.filter(key => {
                const playerIsWomens = Boolean(tennisPlayers[key].isWomens);
                return isWomens === playerIsWomens;
            });

            if (eligiblePlayers.length < 2) continue; // Skip if not enough players

            // Select two different players
            const player1Key = eligiblePlayers[Math.floor(Math.random() * eligiblePlayers.length)];
            let player2Key;
            do {
                player2Key = eligiblePlayers[Math.floor(Math.random() * eligiblePlayers.length)];
            } while (player1Key === player2Key);

            const player1 = tennisPlayers[player1Key];
            const player2 = tennisPlayers[player2Key];

            // Get their countries
            const country1 = tennisCountries[player1.countryCode || 'USA'];
            const country2 = tennisCountries[player2.countryCode || 'USA'];

            // Determine if this match is important (Grand Slams, later rounds, or top players)
            const isImportant = tournament.category === 'Grand Slam' ||
                roundIndex >= 4 || // Quarter-finals or later
                (player1.ranking && player2.ranking &&
                    player1.ranking <= 10 && player2.ranking <= 10);

            // Generate importance reason if the match is important
            const importanceReason = isImportant
                ? generateImportanceReason(tournament, round, player1, player2)
                : undefined;

            // Generate key matchups
            const keyMatchups: KeyMatchup[] = [{
                title: `${player1.name} vs. ${player2.name}`,
                description: `${player1.ranking ? `World #${player1.ranking}` : ''} ${player1.name} faces ${player2.ranking ? `World #${player2.ranking}` : ''} ${player2.name} in the ${round} of ${tournament.name}.`,
                player1: player1,
                player2: player2,
                isPlayerMatchup: true
            }];

            // Random match time between 10:00 AM and 9:00 PM
            const hours = Math.floor(Math.random() * 11) + 10; // 10 AM to 9 PM
            const minutes = Math.random() < 0.5 ? '00' : '30';
            const matchTime = `${hours}:${minutes}`;

            matches.push({
                id: matches.length + 1,
                sportType: 'tennis' as SportType,
                date: formattedDate,
                time: matchTime,
                homeTeam: country1, // Using country as "home team"
                awayTeam: country2, // Using country as "away team"
                location: tournament.location,
                arena: tournament.arena,
                isImportant: Boolean(isImportant),
                importanceReason,
                keyMatchups,
                tournament: {
                    name: tournament.name,
                    surface: tournament.surface,
                    category: tournament.category,
                    round: round
                },
                sets: isWomens ? tournament.womenSets : tournament.sets,
                isWomens: Boolean(isWomens)
            });
        }
    }

    return matches;
};

// Generate importance reason with tags and descriptions
const generateImportanceReason = (
    tournament: TennisTournament,
    round: string,
    player1: Player,
    player2: Player
) => {
    const tags: ImportanceTag[] = [];
    let shortDescription = '';
    let detailedAnalysis = '';

    // Add tags based on tournament category
    if (tournament.category === 'Grand Slam') {
        tags.push('Grand Slam');
    } else if (tournament.category === 'Masters 1000') {
        tags.push('Masters 1000');
    } else if (tournament.category === 'ATP Finals') {
        tags.push('ATP Finals');
    }

    // Add tag for top 10 matchup
    if (player1.ranking && player2.ranking && player1.ranking <= 10 && player2.ranking <= 10) {
        tags.push('Top 10 Matchup');
        shortDescription = `World #${player1.ranking} vs. World #${player2.ranking} in a clash of tennis elite.`;
    }

    // Add tag for rivalry if both players are highly ranked
    if (player1.ranking && player2.ranking && player1.ranking <= 5 && player2.ranking <= 5) {
        tags.push('Rivalry Game');
    }

    // Add tag for potential upset if rankings are far apart
    if (player1.ranking && player2.ranking &&
        ((player1.ranking < 5 && player2.ranking > 20) ||
            (player2.ranking < 5 && player1.ranking > 20))) {
        tags.push('Potential Upset');
    }

    // Add tag for late tournament rounds
    if (round === 'Semi-finals' || round === 'Final') {
        tags.push('Star Matchup');
    }

    // Generate description if not already set
    if (!shortDescription) {
        if (tournament.category === 'Grand Slam') {
            shortDescription = `${round} match at ${tournament.name}, one of tennis's most prestigious events.`;
        } else {
            shortDescription = `Key ${round} match at ${tournament.name} on ${tournament.surface} courts.`;
        }
    }

    // Generate detailed analysis
    detailedAnalysis = `This ${round} match at the ${tournament.name} features ${player1.name} (${player1.countryCode}) against ${player2.name} (${player2.countryCode}) on ${tournament.surface} courts.

${player1.name}${player1.ranking ? ` is currently ranked #${player1.ranking} in the world` : ''} and has won ${player1.stats?.titlesThisSeason || 0} titles this season${player1.stats?.careerTitles ? ` (${player1.stats.careerTitles} in total)` : ''}.

${player2.name}${player2.ranking ? ` is currently ranked #${player2.ranking} in the world` : ''} and has won ${player2.stats?.titlesThisSeason || 0} titles this season${player2.stats?.careerTitles ? ` (${player2.stats.careerTitles} in total)` : ''}.

This match is particularly significant as it takes place at ${tournament.category === 'Grand Slam' ? 'one of the four Grand Slam tournaments' : `the prestigious ${tournament.name}`}, which are the most important events in the tennis calendar.`;

    if (tournament.surface === 'Clay') {
        detailedAnalysis += `\n\nThe clay court surface tends to produce longer rallies and favors players with strong defensive skills and endurance.`;
    } else if (tournament.surface === 'Grass') {
        detailedAnalysis += `\n\nThe grass court surface produces faster play with lower bounces, typically favoring players with strong serves and net play.`;
    } else if (tournament.surface === 'Hard') {
        detailedAnalysis += `\n\nThe hard court surface provides a balance between clay and grass, with moderate pace and consistent bounces.`;
    }

    return {
        tags,
        shortDescription,
        detailedAnalysis
    };
};

// API function to fetch upcoming tennis matches
export const fetchUpcomingTennisMatches = async (): Promise<GamesResponse> => {
    // In a real application, this would make an API call
    // For this demo, we'll generate mock data
    const games = generateMockMatches();

    // Extract unique tournaments, surfaces, and rounds for filtering
    const tournaments = [...new Set(games.map(game => game.tournament?.name))].filter(Boolean) as string[];
    const surfaces = [...new Set(games.map(game => game.tournament?.surface))].filter(Boolean) as string[];
    const rounds = [...new Set(games.map(game => game.tournament?.round))].filter(Boolean) as string[];

    return {
        sportType: 'tennis',
        games,
        tournaments,
        surfaces,
        rounds
    };
}; 