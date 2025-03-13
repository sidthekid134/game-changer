// Common types for all sports
export interface Team {
    id: number;
    name: string;
    abbreviation: string;
    logo: string;
    city: string;
    conference?: string;
    division?: string;
    league?: string;
    // Tennis specific
    country?: string;
}

export interface Player {
    id: number;
    name: string;
    position: string;
    teamId: number;
    isAllStar?: boolean;
    isInjured?: boolean;
    streak?: PlayerStreak;
    stats?: PlayerStats;
    photoUrl?: string;
    // Tennis specific
    ranking?: number;
    countryCode?: string;
    isWomens?: boolean;
}

export interface PlayerStreak {
    type: string;
    count: number;
    description: string;
}

export interface PlayerStats {
    // Common stats across sports
    gamesPlayed?: number;
    gamesStarted?: number;
    minutesPerGame?: number;

    // Basketball specific
    ppg?: number;
    rpg?: number;
    apg?: number;
    spg?: number;
    bpg?: number;
    fg_pct?: number;
    fg3_pct?: number;

    // Baseball specific
    avg?: number;
    hr?: number;
    rbi?: number;
    sb?: number;
    obp?: number;
    slg?: number;
    ops?: number;
    era?: number;
    whip?: number;
    wins?: number;
    saves?: number;
    strikeouts?: number;

    // Football specific
    passingYards?: number;
    passingTouchdowns?: number;
    interceptions?: number;
    rushingYards?: number;
    rushingTouchdowns?: number;
    receptions?: number;
    receivingYards?: number;
    receivingTouchdowns?: number;
    tackles?: number;
    sacks?: number;

    // Soccer specific
    goals?: number;
    assists?: number;
    cleanSheets?: number;
    yellowCards?: number;
    redCards?: number;

    // Tennis specific
    aces?: number;
    doubleFaults?: number;
    firstServePercentage?: number;
    winPercentage?: number;
    titlesThisSeason?: number;
    careerTitles?: number;
}

export interface KeyMatchup {
    title: string;
    description: string;
    player1?: Player;
    player2?: Player;
    isPlayerMatchup?: boolean;
}

export type SportType = 'basketball' | 'baseball' | 'football' | 'soccer' | 'tennis';

export type ImportanceTag =
    // Common tags
    | 'Playoff Implications'
    | 'Rivalry Game'
    | 'Star Matchup'
    | 'Potential Upset'
    | 'Record Chase'
    | 'Championship Rematch'
    | 'Return From Injury'
    | 'Rookie Showcase'
    | 'Late Season Push'
    | 'Player Streak'
    | 'MVP Candidate'
    | 'Hot Team'

    // Basketball specific
    | 'Conference Finals Rematch'

    // Baseball specific
    | 'Division Race'
    | 'Wild Card Hunt'
    | 'No-Hitter Watch'

    // Football specific
    | 'Playoff Berth'
    | 'Division Title'
    | 'Super Bowl Rematch'

    // Soccer specific
    | 'Derby Match'
    | 'Relegation Battle'
    | 'Title Decider'
    | 'Champions League Spot'

    // Tennis specific
    | 'Grand Slam'
    | 'Masters 1000'
    | 'ATP Finals'
    | 'Davis Cup'
    | 'Top 10 Matchup'
    | 'Career Milestone';

export interface ImportanceReason {
    tags: ImportanceTag[];
    shortDescription: string;
    detailedAnalysis: string;
}

export interface Game {
    id: number;
    sportType: SportType;
    date: string;
    time: string;
    homeTeam: Team;
    awayTeam: Team;
    location: string;
    arena: string;
    isImportant: boolean;
    importanceReason?: ImportanceReason;
    keyMatchups: KeyMatchup[];
    week?: number;
    playoffRound?: string;

    // Baseball specific
    seriesInfo?: {
        isSeriesGame: boolean;
        gameNumber: number;
        totalGames: number;
    };

    // Soccer specific
    competition?: string;
    matchday?: number;
    stage?: string;

    // Tennis specific
    tournament?: {
        name: string;
        surface: 'Hard' | 'Clay' | 'Grass' | 'Carpet';
        category: 'Grand Slam' | 'Masters 1000' | 'ATP 500' | 'ATP 250' | 'WTA 1000' | 'WTA 500' | 'WTA 250' | 'ATP Finals';
        round: string;
    };
    sets?: number; // Best of 3 or 5
    isWomens?: boolean;
}

export interface GamesResponse {
    sportType: SportType;
    games: Game[];
    competitions?: string[];
    matchdays?: number[];
    stages?: string[];
    // Tennis specific
    tournaments?: string[];
    surfaces?: string[];
    rounds?: string[];
} 