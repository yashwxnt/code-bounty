import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface LobbyFormProps {
  onLobbyCreated: (code: string) => void;
}

const LobbyForm: React.FC<LobbyFormProps> = ({ onLobbyCreated }) => {
  const [difficulty, setDifficulty] = useState('');
  const [members, setMembers] = useState(1);
  const [timeLimit, setTimeLimit] = useState(10); // Default time limit in minutes

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedCode = '123ABC'; // Replace with actual code generation logic
    onLobbyCreated(generatedCode);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Difficulty Level</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="mt-1 block w-full p-2 border rounded-md bg-background text-foreground"
        >
          <option value="">Select difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Number of Members</label>
        <input
          type="number"
          value={members}
          onChange={(e) => setMembers(Number(e.target.value))}
          min="1"
          max="4"
          className="mt-1 block w-full p-2 border rounded-md bg-background text-foreground"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Time Limit (minutes)</label>
        <input
          type="number"
          value={timeLimit}
          onChange={(e) => setTimeLimit(Number(e.target.value))}
          min="1"
          className="mt-1 block w-full p-2 border rounded-md bg-background text-foreground"
        />
      </div>
      <Button type="submit">Create Lobby</Button>
    </form>
  );
};

export default LobbyForm;
