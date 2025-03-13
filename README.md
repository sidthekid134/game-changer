# NBA Game Analyzer

A modern web application that scans through upcoming NBA games and highlights the important or potentially critical matchups with detailed analysis.

## Features

- **Game Importance Analysis**: Automatically identifies important NBA games with detailed reasoning
- **Color-coded Importance Tags**: Quick visual identification of why games matter (Playoff Implications, Rivalry Games, etc.)
- **Key Matchups**: Highlights specific player and team matchups that will influence game outcomes
- **Expandable Details**: Concise summaries with expandable sections for more in-depth analysis
- **Filtering Options**: Filter by week, playoff round, or show only important games
- **Responsive Design**: Works on all device sizes with a clean, modern interface

## Technology Stack

- **Next.js**: React framework for the frontend
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Framer Motion**: Animation library for smooth transitions
- **date-fns**: Modern JavaScript date utility library
- **React Icons**: Popular icon library

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/game-analyzer.git
   cd game-analyzer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

- **View Important Games**: By default, the app shows only important games
- **Filter Games**: Use the filters at the top to view all games, filter by week, or by playoff round
- **Expand Details**: Click "Show detailed analysis" to see in-depth information about why a game is important
- **View Key Matchups**: Click "View" under the Key Matchups section to see specific matchups to watch for

## Notes

This application uses mock data to simulate an NBA games API. In a production environment, you would connect to a real NBA API to fetch live game data.

## Future Enhancements

- User authentication to save favorite teams and receive notifications
- Historical data analysis to compare teams and predict outcomes
- Integration with real NBA statistics API
- Social sharing features for important games
- Dark mode support

## License

MIT
