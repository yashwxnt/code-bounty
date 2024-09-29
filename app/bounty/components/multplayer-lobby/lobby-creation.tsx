'use client';
import React, { useState } from 'react';
import LobbyForm from './LobbyForm';
import JoinLobbyForm from './JoinLobbyForm';
import Chat from './chatbox';

import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogFooter, 
  AlertDialogTitle, 
  AlertDialogDescription, 
  AlertDialogAction 
} from '@/components/ui/alert-dialog';
import { ClipboardCopy } from 'lucide-react';

const LobbyCreationPage: React.FC = () => {
  const [isLobbyCreated, setIsLobbyCreated] = useState(false);
  const [lobbyCode, setLobbyCode] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hasJoinedLobby, setHasJoinedLobby] = useState(false);

  const handleLobbyCreation = (code: string) => {
    setIsLobbyCreated(true);
    setLobbyCode(code);
    setIsDialogOpen(false); // Close the form dialog
    setHasJoinedLobby(true); // Directly join the lobby after creation
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(lobbyCode)
      .then(() => alert('Lobby code copied to clipboard!'))
      .catch((err) => alert('Failed to copy lobby code: '));
  };

  const handleJoinLobby = (code: string) => {
    setLobbyCode(code);
    setHasJoinedLobby(true);
  };

  if (hasJoinedLobby) {
    return ;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-brenet-regular text-primary bg-background">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center">Create or Join a Lobby</h1>
        
        {!isLobbyCreated && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Create Lobby</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Create a Lobby</DialogTitle>
              <LobbyForm onLobbyCreated={handleLobbyCreation} />
              <DialogClose asChild>
                <Button className="mt-4">Close</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        )}

        <JoinLobbyForm onJoinLobby={handleJoinLobby} />

        {isLobbyCreated && (
          <AlertDialog open={isLobbyCreated} onOpenChange={setIsLobbyCreated}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Lobby Created</AlertDialogTitle>
                <AlertDialogDescription>
                  Your lobby has been created! Use the code <strong>{lobbyCode}</strong> to invite others.
                  <Button className="ml-2 inline-flex items-center" onClick={handleCopyToClipboard}>
                    <ClipboardCopy className="h-4 w-4 mr-2" /> Copy Code
                  </Button>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction asChild>
                  <Button onClick={() => setIsLobbyCreated(false)}>Close</Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
};

export default LobbyCreationPage;
