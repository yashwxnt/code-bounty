import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

interface LobbyWaitingRoomProps {
  lobbyCode: string;
  gameSettings: {
    difficulty: string;
    members: number;
    timeLimit: number;
    theme: string;
  };
  onGameStart: () => void;
}

const LobbyWaitingRoom: React.FC<LobbyWaitingRoomProps> = ({ lobbyCode, gameSettings, onGameStart }) => {
  const [connectedMembers, setConnectedMembers] = useState(1);
  const router = useRouter();

  useEffect(() => {
    // Here you would typically set up a WebSocket connection to listen for new members joining
    // For this example, we'll just simulate members joining every 5 seconds
    const interval = setInterval(() => {
      setConnectedMembers((prev) => (prev < gameSettings.members ? prev + 1 : prev));
    }, 5000);

    return () => clearInterval(interval);
  }, [gameSettings.members]);

  const handleStartGame = () => {
    // Here you would typically send a message to the server to start the game
    // For this example, we'll just call the onGameStart prop
    onGameStart();
  };

  const handleCopyLobbyCode = () => {
    navigator.clipboard.writeText(lobbyCode);
    alert('Lobby code copied to clipboard!');
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Lobby Waiting Room</h2>
      <p className="mb-2">Lobby Code: <span className="font-mono">{lobbyCode}</span></p>
      <Button onClick={handleCopyLobbyCode} className="mb-4">Copy Lobby Code</Button>
      <p className="mb-2">Difficulty: {gameSettings.difficulty}</p>
      <p className="mb-2">Time Limit: {gameSettings.timeLimit} minutes</p>
      <p className="mb-2">Theme: {gameSettings.theme}</p>
      <p className="mb-4">Connected Members: {connectedMembers}/{gameSettings.members}</p>
      <Button 
        onClick={handleStartGame} 
        disabled={connectedMembers < gameSettings.members}
        className="w-full"
      >
        {connectedMembers < gameSettings.members ? 'Waiting for all members...' : 'Start Game'}
      </Button>
    </div>
  );
};

export default LobbyWaitingRoom;