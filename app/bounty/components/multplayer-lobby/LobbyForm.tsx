import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface LobbyFormProps {
  onLobbyCreated: (code: string, initialChallenge: any) => void;
}

const LobbyForm: React.FC<LobbyFormProps> = ({ onLobbyCreated }) => {
  const [difficulty, setDifficulty] = useState('');
  const [members, setMembers] = useState(1);
  const [timeLimit, setTimeLimit] = useState(10); // Default time limit in minutes
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/groqAssistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameState: {
            chapter: 1,
            score: 0,
            theme: 'space mission', // You can make this dynamic if needed
          },
          playerAction: 'start_game',
          settings: {
            difficulty,
            members,
            timeLimit,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create lobby');
      }

      const data = await response.json();
      const generatedCode = Math.random().toString(36).substring(2, 8).toUpperCase(); // Simple code generation
      onLobbyCreated(generatedCode, data.challenges[0]);
    } catch (error) {
      console.error('Error creating lobby:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="difficulty" className="block text-sm font-medium text-foreground">
          Difficulty Level
        </label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="mt-1 block w-full p-2 border rounded-md bg-background text-foreground"
          required
        >
          <option value="">Select difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div>
        <label htmlFor="members" className="block text-sm font-medium text-foreground">
          Number of Members
        </label>
        <input
          type="number"
          id="members"
          value={members}
          onChange={(e) => setMembers(Number(e.target.value))}
          min="1"
          max="4"
          className="mt-1 block w-full p-2 border rounded-md bg-background text-foreground"
          required
        />
      </div>

      <div>
        <label htmlFor="timeLimit" className="block text-sm font-medium text-foreground">
          Time Limit (minutes)
        </label>
        <input
          type="number"
          id="timeLimit"
          value={timeLimit}
          onChange={(e) => setTimeLimit(Number(e.target.value))}
          min="1"
          className="mt-1 block w-full p-2 border rounded-md bg-background text-foreground"
          required
        />
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating Lobby...' : 'Create Lobby'}
      </Button>
    </form>
  );
};

export default LobbyForm;