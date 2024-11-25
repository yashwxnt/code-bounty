'use client';
import React, { useState } from 'react';
import LobbyForm from './LobbyForm';
import JoinLobbyForm from './JoinLobbyForm';
import Chat from './chatbox';
import { useRouter } from 'next/navigation'; 
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
import { ClipboardCopy, Info, Gamepad2, Users } from 'lucide-react';

const LobbyCreationPage: React.FC = () => {
  const [isLobbyCreated, setIsLobbyCreated] = useState(false);
  const [lobbyCode, setLobbyCode] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hasJoinedLobby, setHasJoinedLobby] = useState(false);
  
  const router = useRouter();

  const handleLobbyCreation = (code: string) => {
    setIsLobbyCreated(true);
    setLobbyCode(code);
    setIsDialogOpen(false); // Close the form dialog
    setHasJoinedLobby(true); // Directly join the lobby after creation
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(lobbyCode)
      .then(() => alert('Lobby code copied to clipboard!'))
      .catch((err) => alert('Failed to copy lobby code.'));
  };

  const handleJoinLobby = (code: string) => {
    setLobbyCode(code);
    setHasJoinedLobby(true);
  };

  const handleBackClick = () => {
    router.back(); // Back navigation using next/navigation
  };

  // Render Chat component if user has joined the lobby
  if (hasJoinedLobby) {
    return ;
  }  
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-blue-900 text-white overflow-hidden flex flex-col items-center justify-center relative">
      
      {/* Particle Effect */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-pink-500 animate-ping"></div>
        <div className="absolute bottom-10 left-5 w-3 h-3 rounded-full bg-green-400 animate-ping"></div>
      </div>
      
      {/* Header */}
      <div className="w-full px-8 py-4 flex justify-between items-center bg-black bg-opacity-50 shadow-lg absolute top-0 backdrop-blur-md z-10">
        <h1 className="text-xl font-extrabold text-purple-400 tracking-wider">CodeBounty</h1>
        <Button onClick={handleBackClick} className="bg-red-600 hover:bg-red-500 text-white font-semibold px-4 py-2 rounded-full shadow-lg transition-transform transform hover:scale-105">
          Back
        </Button>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-3xl p-12 mt-16 space-y-10 bg-white bg-opacity-10 shadow-2xl rounded-xl backdrop-blur-md border border-white border-opacity-30 transform hover:scale-105 transition-all duration-300">
        {/* Fun Animated Heading */}
        <h1 className="text-4xl font-extrabold text-center text-pink-400 font-brenet animate-pulse tracking-widest">
          Create or Join a Lobby
        </h1>

        
        {/* Create Lobby */}
        {!isLobbyCreated && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
            <Button className="w-full bg-purple-700 hover:bg-purple-600 text-white font-bold py-3 px-5 rounded-md text-lg transition-transform transform hover:scale-105 hover:bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
              <span className="inline-flex items-center">
                <ClipboardCopy className="h-6 w-6 mr-2" /> Create Lobby
              </span>
            </Button>

            </DialogTrigger>
            <DialogContent className=" rounded-lg p-6 shadow-2xl border border-gray-600">
              <DialogTitle className="text-2xl font-bold">Create a Lobby</DialogTitle>
              <LobbyForm onLobbyCreated={handleLobbyCreation} />
              <DialogClose asChild>
                <Button className="mt-4 bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-5 rounded-lg transition-transform transform hover:scale-105">
                  Close
                </Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        )}

        {/* Join Lobby */}
        <JoinLobbyForm onJoinLobby={handleJoinLobby} />

        {/* Lobby Created Alert */}
        {isLobbyCreated && (
          <AlertDialog open={isLobbyCreated} onOpenChange={setIsLobbyCreated}>
            <AlertDialogContent className="bg-gray-900 text-white rounded-lg p-6 shadow-2xl border border-purple-600">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-2xl font-extrabold">Lobby Created</AlertDialogTitle>
                <AlertDialogDescription>
                  Your lobby has been created! Use the code <strong>{lobbyCode}</strong> to invite others.
                  <Button className="ml-2 inline-flex items-center bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-5 rounded-lg transition-transform transform hover:scale-105" onClick={handleCopyToClipboard}>
                    <ClipboardCopy className="h-5 w-5 mr-2" /> Copy Code
                  </Button>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction asChild>
                  <Button className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-3 px-5 rounded-full transition-transform transform hover:scale-105" onClick={() => setIsLobbyCreated(false)}>
                    Close
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      {/* Papers Section - Information about the App */}
      <div className="w-full max-w-5xl mt-16 p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Paper 1 */}
        <div className="p-6 bg-white bg-opacity-5 rounded-lg shadow-2xl backdrop-blur-md border border-gray-600 hover:bg-opacity-10 transition-all duration-300">
          <div className="flex items-center mb-4">
            <Info className="h-8 w-8 text-green-300 mr-2" />
            <h3 className="text-xl font-extrabold text-gray-200">About the Game</h3>
          </div>
          <p className="text-sm font-medium text-gray-300">
            This game brings players together to compete in coding challenges. Collaborate, solve problems, and enjoy the fun of coding with friends.
          </p>
        </div>

        {/* Paper 2 */}
        <div className="p-6 bg-white bg-opacity-5 rounded-lg shadow-2xl backdrop-blur-md border border-gray-600 hover:bg-opacity-10 transition-all duration-300">
          <div className="flex items-center mb-4">
            <Gamepad2 className="h-8 w-8 text-pink-300 mr-2" />
            <h3 className="text-xl font-extrabold text-gray-200">Gameplay Mechanics</h3>
          </div>
          <p className="text-sm font-medium text-gray-300">
            Solve a variety of coding puzzles in a competitive multiplayer environment. The faster you solve, the more points you score!
          </p>
        </div>

        {/* Paper 3 */}
        <div className="p-6 bg-white bg-opacity-5 rounded-lg shadow-2xl backdrop-blur-md border border-gray-600 hover:bg-opacity-10 transition-all duration-300">
          <div className="flex items-center mb-4">
            <Users className="h-8 w-8 text-blue-300 mr-2" />
            <h3 className="text-xl font-extrabold text-gray-200">Multiplayer Experience</h3>
          </div>
          <p className="text-sm font-medium text-gray-300">
            Join or create a lobby and play with coders around the world! Chat, compete, and show off your coding skills in real time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LobbyCreationPage;
