import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Game Analyzer | Sports Analysis Platform",
  description: "Analyze upcoming games across major sports with detailed insights and matchup analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} font-sans bg-gray-50 text-gray-900 min-h-screen`}>
        <header className="bg-gradient-to-br from-blue-600 to-blue-800 text-white sticky top-0 z-50 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2.00001 17.5228 6.47717 22 12 22Z"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="0.5 2.5" />
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                    fill="currentColor" />
                </svg>
              </div>
              <div>
                <h1 className="font-poppins font-bold text-xl sm:text-2xl">Game Analyzer</h1>
                <p className="text-xs text-blue-100 hidden sm:block">Find the most important upcoming matchups</p>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/sports/basketball" className="text-sm font-medium text-white hover:text-blue-100 transition-colors">Basketball</Link>
                <Link href="/sports/baseball" className="text-sm font-medium text-white hover:text-blue-100 transition-colors">Baseball</Link>
                <Link href="/sports/football" className="text-sm font-medium text-white hover:text-blue-100 transition-colors">Football</Link>
                <Link href="/sports/soccer" className="text-sm font-medium text-white hover:text-blue-100 transition-colors">Soccer</Link>
                <Link href="/sports/tennis" className="text-sm font-medium text-white hover:text-blue-100 transition-colors">Tennis</Link>
              </nav>
              <span className="text-sm px-3 py-1.5 rounded-full bg-blue-700/40 text-blue-100 font-medium">
                {new Date().getFullYear()} Season
              </span>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {children}
        </main>

        <footer className="mt-16 bg-white border-t border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="font-poppins font-medium text-gray-700 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                      fill="currentColor" />
                  </svg>
                </div>
                Game Analyzer
              </div>
              <div className="flex gap-6 text-sm text-gray-500">
                <a href="#" className="hover:text-blue-600 transition-colors">About</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
              </div>
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} · Demo data for illustration
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
