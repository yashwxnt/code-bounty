
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface LobbyFormProps {
  onLobbyCreated: (code: string, settings: LobbySettings) => void;
}

interface LobbySettings {
  difficulty: string;
  members: number;
  timeLimit: number;
  numberOfQuestions: number;
}

const LobbyForm: React.FC<LobbyFormProps> = ({ onLobbyCreated }) => {
  const [difficulty, setDifficulty] = useState('easy');
  const [members, setMembers] = useState(1);
  const [timeLimit, setTimeLimit] = useState(10);
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const settings: LobbySettings = {
        difficulty,
        members,
        timeLimit,
        numberOfQuestions,
      };

      const response = await fetch('/api/groqAssistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerAction: 'create_lobby',
          settings,
          aiPrompt: `Create challenges with ${settings.difficulty} difficulty and ${settings.numberOfQuestions} questions.`,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        onLobbyCreated(data.lobbyCode, settings);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create lobby');
      }
    } catch (error) {
      console.error('Error creating lobby:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
          Difficulty
        </label>
        <Select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="mt-1 block w-full"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </Select>
      </div>

      <div>
        <label htmlFor="members" className="block text-sm font-medium text-gray-700">
          Number of Players
        </label>
        <Input
          id="members"
          type="number"
          value={members}
          onChange={(e) => setMembers(Number(e.target.value))}
          min="1"
          className="mt-1 block w-full"
        />
      </div>

      <div>
        <label htmlFor="timeLimit" className="block text-sm font-medium text-gray-700">
          Time Limit (minutes)
        </label>
        <Input
          id="timeLimit"
          type="number"
          value={timeLimit}
          onChange={(e) => setTimeLimit(Number(e.target.value))}
          min="1"
          className="mt-1 block w-full"
        />
      </div>

      <div>
        <label htmlFor="numberOfQuestions" className="block text-sm font-medium text-gray-700">
          Number of Questions
        </label>
        <Input
          id="numberOfQuestions"
          type="number"
          value={numberOfQuestions}
          onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
          min="1"
          className="mt-1 block w-full"
        />
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Creating Lobby...' : 'Create Lobby'}
      </Button>
    </form>
  );
};

export default LobbyForm;