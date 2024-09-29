'use client'
import React, { useState } from 'react';
import ChallengePage from './components/challange';
import LobbyCreationPage from './components/multplayer-lobby/lobby-creation';

interface LobbySettings {
  difficulty: string;
  members: number;
  timeLimit: number;
  numberOfQuestions: number;
}

function Layout() {
  const [isLobbyCreated, setIsLobbyCreated] = useState(false);
  const [lobbyCode, setLobbyCode] = useState('');
  const [lobbySettings, setLobbySettings] = useState<LobbySettings>({
    difficulty: 'easy',
    members: 1,
    timeLimit: 10,
    numberOfQuestions: 5
  });

  const handleLobbyCreated = (code: string, settings: LobbySettings) => {
    setIsLobbyCreated(true);
    setLobbyCode(code);
    setLobbySettings(settings);
  };

  return (
    <div>
      <header>
        <h1>Debugging Adventure</h1>
      </header>
      <main>
        {isLobbyCreated ? (
          <ChallengePage 
            lobbyCode={lobbyCode} 
            lobbySettings={lobbySettings} 
          />
        ) : (
          <LobbyCreationPage onLobbyCreated={handleLobbyCreated} />
        )}
      </main>
    </div>
  );
}

export default Layout;