import React from 'react';
import { PokerPlayerLeaderboard } from './app/leaderboard'
import './App.css';

const App: React.FC = () => {
    return (
        <div className="app">
            <header className="app-header">
                <PokerPlayerLeaderboard pokerPlayers={[]}/>
            </header>
        </div>
    );
}


export default App;