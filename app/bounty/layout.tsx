'use client';
import React, { useState } from 'react';
import ChallengePage from './components/challange';
import LobbyCreationPage from '../components/multplayer-lobby/lobby-creation';

interface LobbySettings {
  difficulty: string;
  members: number;
  timeLimit: number;
  numberOfQuestions: number;
}

export default function Home() {
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
    <div className="min-h-screen flex flex-col">
          {/* Header */}
          <div className="w-full px-8 py-4 flex justify-between items-center bg-black bg-opacity-50 shadow-lg absolute top-0 backdrop-blur-md z-10">
        <h1 className="text-xl font-extrabold text-purple-400 tracking-wider">CodeBounty</h1>
      </div>
      <main className="flex-grow p-4">
        <ChallengePage />
      </main>
    </div>
  );
}