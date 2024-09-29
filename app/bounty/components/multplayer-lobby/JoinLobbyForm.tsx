import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface JoinLobbyFormProps {
  onJoinLobby: (code: string) => void;
}

const JoinLobbyForm: React.FC<JoinLobbyFormProps> = ({ onJoinLobby }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [code, setCode] = useState('');

  const handleJoinLobby = (e: React.FormEvent) => {
    e.preventDefault();
    onJoinLobby(code);
    setIsDialogOpen(false);
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
        <Button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 px-6 rounded-lg text-xl shadow-lg transform transition-transform hover:scale-110 border-2 border-black border-opacity-50">
          Join Lobby
        </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Join a Lobby</DialogTitle>
          <form onSubmit={handleJoinLobby}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="code">Lobby Code</Label>
                <input
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="w-full mt-1 p-2 border rounded-md bg-background text-foreground"
                />
              </div>
              <Button type="submit" className="w-full mt-4">
                Join Lobby
              </Button>
            </div>
          </form>
          <DialogClose asChild>
            <Button className="mt-4">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JoinLobbyForm;
