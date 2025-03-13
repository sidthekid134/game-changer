import { format, addDays } from 'date-fns';
import { Game, Team, ImportanceTag, KeyMatchup, Player } from '../types';
import { getPlayersForTeam, getPlayersWithStreaks, getStarPlayerFromTeam } from './mockPlayers';

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
        conference: 'East'
    },
    'BOS': {
        id: 2,
        name: 'Celtics',
        abbreviation: 'BOS',
        logo: 'https://cdn.nba.com/logos/nba/1610612738/global/L/logo.svg',
        city: 'Boston',
        conference: 'East'
    },
    'BKN': {
        id: 3,
        name: 'Nets',
        abbreviation: 'BKN',
        logo: 'https://cdn.nba.com/logos/nba/1610612751/global/L/logo.svg',
        city: 'Brooklyn',
        conference: 'East'
    },
    'CHA': {
        id: 4,
        name: 'Hornets',
        abbreviation: 'CHA',
        logo: 'https://cdn.nba.com/logos/nba/1610612766/global/L/logo.svg',
        city: 'Charlotte',
        conference: 'East'
    },
    'CHI': {
        id: 5,
        name: 'Bulls',
        abbreviation: 'CHI',
        logo: 'https://cdn.nba.com/logos/nba/1610612741/global/L/logo.svg',
        city: 'Chicago',
        conference: 'East'
    },
    'CLE': {
        id: 6,
        name: 'Cavaliers',
        abbreviation: 'CLE',
        logo: 'https://cdn.nba.com/logos/nba/1610612739/global/L/logo.svg',
        city: 'Cleveland',
        conference: 'East'
    },
    'DAL': {
        id: 7,
        name: 'Mavericks',
        abbreviation: 'DAL',
        logo: 'https://cdn.nba.com/logos/nba/1610612742/global/L/logo.svg',
        city: 'Dallas',
        conference: 'West'
    },
    'DEN': {
        id: 8,
        name: 'Nuggets',
        abbreviation: 'DEN',
        logo: 'https://cdn.nba.com/logos/nba/1610612743/global/L/logo.svg',
        city: 'Denver',
        conference: 'West'
    },
    'DET': {
        id: 9,
        name: 'Pistons',
        abbreviation: 'DET',
        logo: 'https://cdn.nba.com/logos/nba/1610612765/global/L/logo.svg',
        city: 'Detroit',
        conference: 'East'
    },
    'GSW': {
        id: 10,
        name: 'Warriors',
        abbreviation: 'GSW',
        logo: 'https://cdn.nba.com/logos/nba/1610612744/global/L/logo.svg',
        city: 'Golden State',
        conference: 'West'
    },
    'HOU': {
        id: 11,
        name: 'Rockets',
        abbreviation: 'HOU',
        logo: 'https://cdn.nba.com/logos/nba/1610612745/global/L/logo.svg',
        city: 'Houston',
        conference: 'West'
    },
    'IND': {
        id: 12,
        name: 'Pacers',
        abbreviation: 'IND',
        logo: 'https://cdn.nba.com/logos/nba/1610612754/global/L/logo.svg',
        city: 'Indiana',
        conference: 'East'
    },
    'LAC': {
        id: 13,
        name: 'Clippers',
        abbreviation: 'LAC',
        logo: 'https://cdn.nba.com/logos/nba/1610612746/global/L/logo.svg',
        city: 'LA',
        conference: 'West'
    },
    'LAL': {
        id: 14,
        name: 'Lakers',
        abbreviation: 'LAL',
        logo: 'https://cdn.nba.com/logos/nba/1610612747/global/L/logo.svg',
        city: 'Los Angeles',
        conference: 'West'
    },
    'MEM': {
        id: 15,
        name: 'Grizzlies',
        abbreviation: 'MEM',
        logo: 'https://cdn.nba.com/logos/nba/1610612763/global/L/logo.svg',
        city: 'Memphis',
        conference: 'West'
    },
    'MIA': {
        id: 16,
        name: 'Heat',
        abbreviation: 'MIA',
        logo: 'https://cdn.nba.com/logos/nba/1610612748/global/L/logo.svg',
        city: 'Miami',
        conference: 'East'
    },
    'MIL': {
        id: 17,
        name: 'Bucks',
        abbreviation: 'MIL',
        logo: 'https://cdn.nba.com/logos/nba/1610612749/global/L/logo.svg',
        city: 'Milwaukee',
        conference: 'East'
    },
    'MIN': {
        id: 18,
        name: 'Timberwolves',
        abbreviation: 'MIN',
        logo: 'https://cdn.nba.com/logos/nba/1610612750/global/L/logo.svg',
        city: 'Minnesota',
        conference: 'West'
    },
    'NOP': {
        id: 19,
        name: 'Pelicans',
        abbreviation: 'NOP',
        logo: 'https://cdn.nba.com/logos/nba/1610612740/global/L/logo.svg',
        city: 'New Orleans',
        conference: 'West'
    },
    'NYK': {
        id: 20,
        name: 'Knicks',
        abbreviation: 'NYK',
        logo: 'https://cdn.nba.com/logos/nba/1610612752/global/L/logo.svg',
        city: 'New York',
        conference: 'East'
    },
    'OKC': {
        id: 21,
        name: 'Thunder',
        abbreviation: 'OKC',
        logo: 'https://cdn.nba.com/logos/nba/1610612760/global/L/logo.svg',
        city: 'Oklahoma City',
        conference: 'West'
    },
    'ORL': {
        id: 22,
        name: 'Magic',
        abbreviation: 'ORL',
        logo: 'https://cdn.nba.com/logos/nba/1610612753/global/L/logo.svg',
        city: 'Orlando',
        conference: 'East'
    },
    'PHI': {
        id: 23,
        name: '76ers',
        abbreviation: 'PHI',
        logo: 'https://cdn.nba.com/logos/nba/1610612755/global/L/logo.svg',
        city: 'Philadelphia',
        conference: 'East'
    },
    'PHX': {
        id: 24,
        name: 'Suns',
        abbreviation: 'PHX',
        logo: 'https://cdn.nba.com/logos/nba/1610612756/global/L/logo.svg',
        city: 'Phoenix',
        conference: 'West'
    },
    'POR': {
        id: 25,
        name: 'Trail Blazers',
        abbreviation: 'POR',
        logo: 'https://cdn.nba.com/logos/nba/1610612757/global/L/logo.svg',
        city: 'Portland',
        conference: 'West'
    },
    'SAC': {
        id: 26,
        name: 'Kings',
        abbreviation: 'SAC',
        logo: 'https://cdn.nba.com/logos/nba/1610612758/global/L/logo.svg',
        city: 'Sacramento',
        conference: 'West'
    },
    'SAS': {
        id: 27,
        name: 'Spurs',
        abbreviation: 'SAS',
        logo: 'https://cdn.nba.com/logos/nba/1610612759/global/L/logo.svg',
        city: 'San Antonio',
        conference: 'West'
    },
    'TOR': {
        id: 28,
        name: 'Raptors',
        abbreviation: 'TOR',
        logo: 'https://cdn.nba.com/logos/nba/1610612761/global/L/logo.svg',
        city: 'Toronto',
        conference: 'East'
    },
    'UTA': {
        id: 29,
        name: 'Jazz',
        abbreviation: 'UTA',
        logo: 'https://cdn.nba.com/logos/nba/1610612762/global/L/logo.svg',
        city: 'Utah',
        conference: 'West'
    },
    'WAS': {
        id: 30,
        name: 'Wizards',
        abbreviation: 'WAS',
        logo: 'https://cdn.nba.com/logos/nba/1610612764/global/L/logo.svg',
        city: 'Washington',
        conference: 'East'
    }
};

// Sample arenas
const arenas: Record<string, string> = {
    'ATL': 'State Farm Arena',
    'BOS': 'TD Garden',
    'BKN': 'Barclays Center',
    'CHA': 'Spectrum Center',
    'CHI': 'United Center',
    'CLE': 'Rocket Mortgage FieldHouse',
    'DAL': 'American Airlines Center',
    'DEN': 'Ball Arena',
    'DET': 'Little Caesars Arena',
    'GSW': 'Chase Center',
    'HOU': 'Toyota Center',
    'IND': 'Gainbridge Fieldhouse',
    'LAC': 'Crypto.com Arena',
    'LAL': 'Crypto.com Arena',
    'MEM': 'FedExForum',
    'MIA': 'Kaseya Center',
    'MIL': 'Fiserv Forum',
    'MIN': 'Target Center',
    'NOP': 'Smoothie King Center',
    'NYK': 'Madison Square Garden',
    'OKC': 'Paycom Center',
    'ORL': 'Kia Center',
    'PHI': 'Wells Fargo Center',
    'PHX': 'Footprint Center',
    'POR': 'Moda Center',
    'SAC': 'Golden 1 Center',
    'SAS': 'Frost Bank Center',
    'TOR': 'Scotiabank Arena',
    'UTA': 'Delta Center',
    'WAS': 'Capital One Arena'
};

// Generate mock game data
const generateMockGames = (): Game[] => {
    const games: Game[] = [];
    const today = new Date();
    const teams = Object.values(nbaTeams);

    // Generate games for next 30 days
    for (let i = 0; i < 30; i++) {
        const date = addDays(today, i);
        const formattedDate = format(date, 'yyyy-MM-dd');
        const weekNumber = Math.floor(i / 7) + 1;

        // Generate 3-5 games per day
        const gamesCount = Math.floor(Math.random() * 3) + 3;

        for (let j = 0; j < gamesCount; j++) {
            // Pick random home and away teams
            const homeTeamIndex = Math.floor(Math.random() * teams.length);
            let awayTeamIndex = Math.floor(Math.random() * teams.length);

            // Make sure home and away teams are different
            while (awayTeamIndex === homeTeamIndex) {
                awayTeamIndex = Math.floor(Math.random() * teams.length);
            }

            const homeTeam = teams[homeTeamIndex];
            const awayTeam = teams[awayTeamIndex];

            // Get players for both teams
            const homePlayers = getPlayersForTeam(homeTeam.abbreviation);
            const awayPlayers = getPlayersForTeam(awayTeam.abbreviation);

            // Check if any players are on streaks
            const homePlayersWithStreaks = homePlayers.filter(player => player.streak);
            const awayPlayersWithStreaks = awayPlayers.filter(player => player.streak);
            const hasPlayerOnStreak = homePlayersWithStreaks.length > 0 || awayPlayersWithStreaks.length > 0;

            // Determine if this is an important game
            // Games with players on streaks have a higher chance of being important
            const isImportant = hasPlayerOnStreak ? Math.random() < 0.7 : Math.random() < 0.3;

            // Generate random time for the game
            const hour = Math.floor(Math.random() * 12) + 1;
            const minutes = ['00', '30'][Math.floor(Math.random() * 2)];
            const period = ['AM', 'PM'][Math.floor(Math.random() * 2)];
            const time = `${hour}:${minutes} ${period} ET`;

            // Create mock key matchups
            const keyMatchups: KeyMatchup[] = [];

            // Add team-based matchups
            if (Math.random() > 0.5) {
                keyMatchups.push({
                    title: `${homeTeam.city} Defense vs ${awayTeam.city} Offense`,
                    description: `How the ${homeTeam.name} defense handles the ${awayTeam.name}'s high-powered offense will be crucial.`
                });
            }

            if (Math.random() > 0.6) {
                keyMatchups.push({
                    title: `Bench Production`,
                    description: `The depth of both teams could play a significant role in determining the outcome.`
                });
            }

            // Add player-specific matchups
            // Star vs Star matchup
            const homeStarPlayer = getStarPlayerFromTeam(homeTeam.abbreviation);
            const awayStarPlayer = getStarPlayerFromTeam(awayTeam.abbreviation);

            if (homeStarPlayer && awayStarPlayer && Math.random() > 0.3) {
                const matchupTitle = `${homeStarPlayer.name} vs ${awayStarPlayer.name}`;
                let matchupDescription = `Two of the league's premier ${homeStarPlayer.position}s face off in what could be a game-defining matchup.`;

                // Add streak information if applicable
                if (homeStarPlayer.streak) {
                    matchupDescription = `${homeStarPlayer.name} (${homeStarPlayer.streak.description}) looks to continue his hot streak against ${awayStarPlayer.name}.`;
                } else if (awayStarPlayer.streak) {
                    matchupDescription = `${awayStarPlayer.name} (${awayStarPlayer.streak.description}) aims to keep his momentum going against ${homeStarPlayer.name}.`;
                }

                // Add stats comparison
                if (homeStarPlayer.stats && awayStarPlayer.stats) {
                    matchupDescription += ` ${homeStarPlayer.name} is averaging ${homeStarPlayer.stats.ppg} PPG while ${awayStarPlayer.name} is putting up ${awayStarPlayer.stats.ppg} PPG this season.`;
                }

                keyMatchups.push({
                    title: matchupTitle,
                    description: matchupDescription,
                    player1: homeStarPlayer,
                    player2: awayStarPlayer,
                    isPlayerMatchup: true
                });
            }

            // Add streak player matchup if not already covered
            const streakPlayers = [...homePlayersWithStreaks, ...awayPlayersWithStreaks];
            if (streakPlayers.length > 0 && Math.random() > 0.5) {
                const streakPlayer = streakPlayers[Math.floor(Math.random() * streakPlayers.length)];
                const isHomeTeamPlayer = homePlayersWithStreaks.includes(streakPlayer);
                const opposingTeam = isHomeTeamPlayer ? awayTeam : homeTeam;

                keyMatchups.push({
                    title: `${streakPlayer.name}'s Hot Streak`,
                    description: `${streakPlayer.name} brings his ${streakPlayer.streak?.description} into this matchup against the ${opposingTeam.name}.`,
                    player1: streakPlayer,
                    isPlayerMatchup: true
                });
            }

            // Create the game object
            const game: Game = {
                id: games.length + 1,
                date: formattedDate,
                time,
                homeTeam,
                awayTeam,
                location: `${homeTeam.city}, ${getStateFromTeam(homeTeam.abbreviation)}`,
                arena: arenas[homeTeam.abbreviation],
                isImportant,
                keyMatchups,
                week: weekNumber,
            };

            // If important, add importance reason
            if (isImportant) {
                game.importanceReason = generateImportanceReason(homeTeam, awayTeam, homePlayersWithStreaks, awayPlayersWithStreaks);
            }

            // Add playoff round for games after day 20
            if (i >= 20) {
                const playoffRounds = ['First Round', 'Conference Semifinals', 'Conference Finals', 'NBA Finals'];
                const roundIndex = Math.floor((i - 20) / 3);

                if (roundIndex < playoffRounds.length) {
                    game.playoffRound = playoffRounds[roundIndex];
                }
            }

            games.push(game);
        }
    }

    return games;
};

// Helper function to get state from team abbreviation
const getStateFromTeam = (abbreviation: string): string => {
    const states: Record<string, string> = {
        'ATL': 'GA', 'BOS': 'MA', 'BKN': 'NY', 'CHA': 'NC', 'CHI': 'IL',
        'CLE': 'OH', 'DAL': 'TX', 'DEN': 'CO', 'DET': 'MI', 'GSW': 'CA',
        'HOU': 'TX', 'IND': 'IN', 'LAC': 'CA', 'LAL': 'CA', 'MEM': 'TN',
        'MIA': 'FL', 'MIL': 'WI', 'MIN': 'MN', 'NOP': 'LA', 'NYK': 'NY',
        'OKC': 'OK', 'ORL': 'FL', 'PHI': 'PA', 'PHX': 'AZ', 'POR': 'OR',
        'SAC': 'CA', 'SAS': 'TX', 'TOR': 'ON', 'UTA': 'UT', 'WAS': 'DC'
    };

    return states[abbreviation] || '';
};

// Generate importance reason for important games
const generateImportanceReason = (
    homeTeam: Team,
    awayTeam: Team,
    homePlayersWithStreaks: Player[] = [],
    awayPlayersWithStreaks: Player[] = []
) => {
    const possibleTags: ImportanceTag[] = [
        'Playoff Implications',
        'Rivalry Game',
        'Star Matchup',
        'Potential Upset',
        'Record Chase',
        'Championship Rematch',
        'Return From Injury',
        'Rookie Showcase',
        'Late Season Push',
        'Conference Finals Rematch'
    ];

    // Add player streak tag if applicable
    if (homePlayersWithStreaks.length > 0 || awayPlayersWithStreaks.length > 0) {
        possibleTags.push('Player Streak');
    }

    // Check if there are any players with streaks in the league for context
    const allPlayersWithStreaks = getPlayersWithStreaks();
    // If this game features players with streaks that are among the top streaks in the league, highlight it
    const hasTopStreakPlayer = [...homePlayersWithStreaks, ...awayPlayersWithStreaks].some(player =>
        allPlayersWithStreaks.slice(0, 3).some(p => p.id === player.id)
    );

    if (hasTopStreakPlayer && !possibleTags.includes('Player Streak')) {
        possibleTags.push('Player Streak');
    }

    // Add MVP candidate tag for certain players
    const mvpCandidates = ['Nikola Jokić', 'Giannis Antetokounmpo', 'Luka Dončić', 'Joel Embiid', 'Shai Gilgeous-Alexander'];
    const homeStarPlayer = getStarPlayerFromTeam(homeTeam.abbreviation);
    const awayStarPlayer = getStarPlayerFromTeam(awayTeam.abbreviation);

    if ((homeStarPlayer && mvpCandidates.includes(homeStarPlayer.name)) ||
        (awayStarPlayer && mvpCandidates.includes(awayStarPlayer.name))) {
        possibleTags.push('MVP Candidate');
    }

    // Pick 1-3 random tags
    const tagCount = Math.floor(Math.random() * 3) + 1;
    const shuffledTags = [...possibleTags].sort(() => 0.5 - Math.random());
    const selectedTags = shuffledTags.slice(0, tagCount) as ImportanceTag[];

    // Ensure Player Streak tag is included if there are players with streaks
    if ((homePlayersWithStreaks.length > 0 || awayPlayersWithStreaks.length > 0) &&
        !selectedTags.includes('Player Streak')) {
        selectedTags[selectedTags.length - 1] = 'Player Streak';
    }

    const shortDescriptions: Record<ImportanceTag, string> = {
        'Playoff Implications': `Critical for ${homeTeam.name} & ${awayTeam.name} playoff positioning`,
        'Rivalry Game': `Historic rivalry between ${homeTeam.city} and ${awayTeam.city}`,
        'Star Matchup': 'Multiple All-Stars face off in key matchup',
        'Potential Upset': `${awayTeam.name} looking to upset ${homeTeam.name}`,
        'Record Chase': 'Teams chasing historical regular season milestone',
        'Championship Rematch': 'Rematch of last season\'s NBA Finals',
        'Return From Injury': 'Key player returns from extended injury absence',
        'Rookie Showcase': 'Top rookies face off in anticipated matchup',
        'Late Season Push': 'Teams fighting for last playoff spots',
        'Conference Finals Rematch': `Rematch of last season's ${homeTeam.conference} Conference Finals`,
        'Player Streak': getPlayerStreakShortDescription(homePlayersWithStreaks, awayPlayersWithStreaks),
        'MVP Candidate': getMvpCandidateShortDescription(homeStarPlayer, awayStarPlayer, mvpCandidates),
        'Hot Team': `${homeTeam.name} or ${awayTeam.name} on a significant win streak`
    };

    const detailedAnalyses: Record<ImportanceTag, string> = {
        'Playoff Implications': `This matchup has significant playoff implications for both teams. The ${homeTeam.name} and ${awayTeam.name} are battling for crucial playoff positioning in the ${homeTeam.conference} Conference. A win here could mean the difference between home-court advantage or a more favorable first-round matchup.`,

        'Rivalry Game': `The historic rivalry between the ${homeTeam.city} ${homeTeam.name} and ${awayTeam.city} ${awayTeam.name} always delivers intensity. These teams have met in the playoffs multiple times, and the bad blood continues to simmer. Expect physical play and heightened emotions from both sides.`,

        'Star Matchup': getStarMatchupDetailedAnalysis(homeTeam, awayTeam, homeStarPlayer, awayStarPlayer),

        'Potential Upset': `The ${awayTeam.name} are poised for a potential upset against the favored ${homeTeam.name}. Despite being underdogs, they've shown resilience against top teams this season and match up well in key statistical categories against their opponents tonight.`,

        'Record Chase': `Both teams are chasing significant regular season milestones. Historical records are within reach, adding extra motivation beyond the win-loss column. Individual and team achievements are on the line in this statistically significant matchup.`,

        'Championship Rematch': `This is a rematch of last season's thrilling NBA Finals series. The bitter taste of defeat still lingers for the losing side, while the champions aim to prove their victory was no fluke. Expect strategical adjustments based on last year's series.`,

        'Return From Injury': `This game marks the return of a key player from an extended injury absence. Their impact could dramatically shift the team's dynamics and playoff outlook. All eyes will be on their performance and how they reintegrate with the roster.`,

        'Rookie Showcase': `Top draft picks will showcase their talents in this rookie highlight game. These young stars represent the future of their franchises and the league. Their development and head-to-head matchup will be scrutinized by fans and analysts alike.`,

        'Late Season Push': `With the regular season winding down, both teams are making their final push for playoff positioning. Every win is crucial at this stage, and the desperation will be evident in the intensity of play from both sides.`,

        'Conference Finals Rematch': `This is a rematch of last season's ${homeTeam.conference} Conference Finals. The losing team has been waiting all season for revenge, while the winners look to prove their superiority once again. Tactical adjustments from both coaching staffs will be fascinating to observe.`,

        'Player Streak': getPlayerStreakDetailedAnalysis(homePlayersWithStreaks, awayPlayersWithStreaks, homeTeam, awayTeam),

        'MVP Candidate': getMvpCandidateDetailedAnalysis(homeStarPlayer, awayStarPlayer, mvpCandidates, homeTeam, awayTeam),

        'Hot Team': `One of these teams is currently on a significant winning streak, adding extra importance to this matchup. A win against a quality opponent would further validate their recent success, while the opposing team has extra motivation to be the ones to end the streak.`
    };

    // Get short description and detailed analysis for each selected tag
    const shortDescription = selectedTags.map(tag => shortDescriptions[tag]).join('. ');
    const detailedAnalysis = selectedTags.map(tag => detailedAnalyses[tag]).join('\n\n');

    return {
        tags: selectedTags,
        shortDescription,
        detailedAnalysis
    };
};

// Helper function to generate player streak short description
const getPlayerStreakShortDescription = (homePlayersWithStreaks: Player[], awayPlayersWithStreaks: Player[]): string => {
    const allStreakPlayers = [...homePlayersWithStreaks, ...awayPlayersWithStreaks];

    if (allStreakPlayers.length === 0) return 'Players looking to continue recent hot streaks';

    const streakPlayer = allStreakPlayers[0];
    return `${streakPlayer.name} on a ${streakPlayer.streak?.type} streak (${streakPlayer.streak?.description})`;
};

// Helper function to generate MVP candidate short description
const getMvpCandidateShortDescription = (
    homeStarPlayer: Player | undefined,
    awayStarPlayer: Player | undefined,
    mvpCandidates: string[]
): string => {
    if (homeStarPlayer && mvpCandidates.includes(homeStarPlayer.name)) {
        return `MVP candidate ${homeStarPlayer.name} leads his team in key matchup`;
    } else if (awayStarPlayer && mvpCandidates.includes(awayStarPlayer.name)) {
        return `MVP candidate ${awayStarPlayer.name} leads his team in key matchup`;
    }
    return 'MVP candidates showcase their talents in critical game';
};

// Helper function to generate star matchup detailed analysis
const getStarMatchupDetailedAnalysis = (
    homeTeam: Team,
    awayTeam: Team,
    homeStarPlayer: Player | undefined,
    awayStarPlayer: Player | undefined
): string => {
    let analysis = `This game features multiple All-Stars going head-to-head. Basketball fans won't want to miss these elite talents competing at the highest level. Watch for individual scoring duels and clutch performances that could define the narrative of this season.`;

    if (homeStarPlayer && awayStarPlayer) {
        analysis += `\n\nThe matchup between ${homeStarPlayer.name} and ${awayStarPlayer.name} will be particularly fascinating. `;

        if (homeStarPlayer.stats && awayStarPlayer.stats) {
            analysis += `${homeStarPlayer.name} is averaging ${homeStarPlayer.stats.ppg} points, ${homeStarPlayer.stats.rpg} rebounds, and ${homeStarPlayer.stats.apg} assists, while ${awayStarPlayer.name} counters with ${awayStarPlayer.stats.ppg} points, ${awayStarPlayer.stats.rpg} rebounds, and ${awayStarPlayer.stats.apg} assists per game.`;
        }

        if (homeStarPlayer.streak) {
            analysis += ` ${homeStarPlayer.name} enters this game on a hot streak, with ${homeStarPlayer.streak.description}.`;
        }

        if (awayStarPlayer.streak) {
            analysis += ` ${awayStarPlayer.name} has been on fire lately, with ${awayStarPlayer.streak.description}.`;
        }
    }

    return analysis;
};

// Helper function to generate player streak detailed analysis
const getPlayerStreakDetailedAnalysis = (
    homePlayersWithStreaks: Player[],
    awayPlayersWithStreaks: Player[],
    homeTeam: Team,
    awayTeam: Team
): string => {
    let analysis = `This game features players on significant statistical streaks that add an extra layer of intrigue to the matchup.`;

    if (homePlayersWithStreaks.length > 0) {
        const player = homePlayersWithStreaks[0];
        analysis += `\n\n${player.name} of the ${homeTeam.name} has been on an impressive run, with ${player.streak?.description}. `;

        if (player.stats) {
            analysis += `He's averaging ${player.stats.ppg} points, ${player.stats.rpg} rebounds, and ${player.stats.apg} assists per game this season. `;
        }

        analysis += `The ${awayTeam.name} will need to focus their defensive strategy on containing him if they hope to secure a victory.`;
    }

    if (awayPlayersWithStreaks.length > 0) {
        const player = awayPlayersWithStreaks[0];
        analysis += `\n\n${player.name} of the ${awayTeam.name} comes into this game with ${player.streak?.description}. `;

        if (player.stats) {
            analysis += `With season averages of ${player.stats.ppg} points, ${player.stats.rpg} rebounds, and ${player.stats.apg} assists, `;
        }

        analysis += `he presents a significant challenge for the ${homeTeam.name} defense. Fans will be watching closely to see if he can maintain this level of play against a quality opponent.`;
    }

    return analysis;
};

// Helper function to generate MVP candidate detailed analysis
const getMvpCandidateDetailedAnalysis = (
    homeStarPlayer: Player | undefined,
    awayStarPlayer: Player | undefined,
    mvpCandidates: string[],
    homeTeam: Team,
    awayTeam: Team
): string => {
    let analysis = `This game features an MVP candidate who has been dominating the league this season.`;

    if (homeStarPlayer && mvpCandidates.includes(homeStarPlayer.name)) {
        analysis = `${homeStarPlayer.name} has been in the MVP conversation all season, and this game presents another opportunity to strengthen his case. `;

        if (homeStarPlayer.stats) {
            analysis += `With averages of ${homeStarPlayer.stats.ppg} points, ${homeStarPlayer.stats.rpg} rebounds, and ${homeStarPlayer.stats.apg} assists, he's been the driving force behind the ${homeTeam.name}'s success. `;
        }

        if (homeStarPlayer.streak) {
            analysis += `He enters this game on a hot streak, with ${homeStarPlayer.streak.description}. `;
        }

        analysis += `The ${awayTeam.name} will need to devise a special defensive scheme to contain him.`;
    } else if (awayStarPlayer && mvpCandidates.includes(awayStarPlayer.name)) {
        analysis = `${awayStarPlayer.name} has been making a strong case for MVP consideration this season, and this matchup provides another platform to showcase his talents. `;

        if (awayStarPlayer.stats) {
            analysis += `Averaging ${awayStarPlayer.stats.ppg} points, ${awayStarPlayer.stats.rpg} rebounds, and ${awayStarPlayer.stats.apg} assists, he's been the cornerstone of the ${awayTeam.name}'s game plan. `;
        }

        if (awayStarPlayer.streak) {
            analysis += `His current streak of ${awayStarPlayer.streak.description} has elevated his team's performance. `;
        }

        analysis += `The ${homeTeam.name} will have their hands full trying to slow him down on their home court.`;
    }

    return analysis;
};

// Function to fetch all upcoming games
export const fetchUpcomingGames = async () => {
    // In a real app, we would make an API call here
    // For this mock, we'll generate random games

    try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const games = generateMockGames();

        // Extract weeks and playoff rounds
        const weeks = Array.from(new Set(games.map(game => game.week).filter(Boolean))) as number[];
        const playoffRounds = Array.from(new Set(games.map(game => game.playoffRound).filter(Boolean))) as string[];

        return {
            games,
            weeks,
            playoffRounds
        };
    } catch (error) {
        console.error("Error fetching upcoming games:", error);
        throw error;
    }
};

// Function to fetch important games
export const fetchImportantGames = async () => {
    try {
        const { games } = await fetchUpcomingGames();
        return games.filter(game => game.isImportant);
    } catch (error) {
        console.error("Error fetching important games:", error);
        throw error;
    }
}; 