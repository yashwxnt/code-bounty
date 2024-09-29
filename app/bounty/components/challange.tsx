'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Send, Trophy, Code, MessageSquare, Users, Clock } from 'lucide-react';

const ChallengePage = () => {
  const [gameState, setGameState] = useState({
    chapter: 1,
    score: 0,
    theme: 'space mission',
  });
  const [challenges, setChallenges] = useState([]);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchChallenge();
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const fetchChallenge = async () => {
    try {
      setError(null);
      const response = await fetch('/api/groqAssistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameState,
          playerAction: 'start_game',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch challenges');
      }

      const data = await response.json();
      if (!data.challenges || !Array.isArray(data.challenges)) {
        throw new Error('Invalid challenge data received');
      }

      setChallenges(data.challenges);
    } catch (error) {
      console.error('Error fetching challenge:', error);
      setError('Failed to load challenges. Please try again.');
    }
  };

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
  };

  const handleSubmit = async () => {
    if (selectedAnswer === null) return;

    try {
      const response = await fetch('/api/groqAssistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameState: {
            ...gameState,
            score: gameState.score + (selectedAnswer === challenges[currentChallengeIndex].correctAnswer ? 10 : 0),
          },
          playerAction: 'submit_answer',
          selectedAnswer,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit answer');
      }

      const data = await response.json();
      setFeedback(data.feedback);

      if (currentChallengeIndex < challenges.length - 1) {
        setCurrentChallengeIndex(currentChallengeIndex + 1);
      } else {
        console.log('Game complete');
      }

      setSelectedAnswer(null);
    } catch (error) {
      console.error('Error submitting answer:', error);
      setError('Failed to submit answer. Please try again.');
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, { text: newMessage, sender: 'You' }]);
      setNewMessage('');

      try {
        const response = await fetch('/api/groqAssistant', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            gameState,
            playerAction: 'chat',
            message: newMessage,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        const data = await response.json();
        setChatMessages((prevMessages) => [...prevMessages, { text: data.response, sender: 'AI' }]);
      } catch (error) {
        console.error('Error sending message:', error);
        setError('Failed to send message. Please try again.');
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!challenges.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading challenges...
        </motion.div>
      </div>
    );
  }

  const currentChallenge = challenges[currentChallengeIndex];

  return (
    <div className="container mx-auto p-4 space-y-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center mb-6">Debugging Adventure: {gameState.theme}</h1>
      </motion.div>

      <Tabs defaultValue="challenge" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="challenge" className="flex items-center justify-center">
            <Code className="mr-2" /> Challenge
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center justify-center">
            <MessageSquare className="mr-2" /> Chat
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="flex items-center justify-center">
            <Users className="mr-2" /> Leaderboard
          </TabsTrigger>
        </TabsList>

        <TabsContent value="challenge">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span className="text-2xl font-bold">Chapter {gameState.chapter}: Debug the Code</span>
                <Badge variant="secondary" className="text-xl font-bold px-3 py-1">
                  <Clock className="mr-2 h-4 w-4" />
                  {formatTime(timeLeft)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{currentChallenge.storyline}</p>
              <ScrollArea className="h-[200px] w-full rounded-md border p-4 bg-gray-100">
                <pre className="font-mono text-sm">
                  <code>{currentChallenge.code}</code>
                </pre>
              </ScrollArea>
              <div className="mt-4 space-y-2">
                {currentChallenge.options.map((option, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant={selectedAnswer === index ? "default" : "outline"}
                      className="w-full justify-start text-left"
                      onClick={() => handleAnswerSelect(index)}
                    >
                      {option}
                    </Button>
                  </motion.div>
                ))}
              </div>
              <p className="mt-4 text-sm text-gray-600">Hint: {currentChallenge.hint}</p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={handleSubmit} 
                disabled={selectedAnswer === null}
              >
                Submit Answer
              </Button>
            </CardFooter>
          </Card>

          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Alert className="mt-4">
                  {feedback.isCorrect ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <AlertTitle>Correct!</AlertTitle>
                      <AlertDescription>{feedback.message}</AlertDescription>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 text-red-500" />
                      <AlertTitle>Incorrect</AlertTitle>
                      <AlertDescription>{feedback.message}</AlertDescription>
                    </>
                  )}
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>

        <TabsContent value="chat">
          <Card className="h-[400px]">
            <CardContent className="flex flex-col h-full">
              <ScrollArea className="flex-grow" ref={chatContainerRef}>
                <div className="space-y-4">
                  {chatMessages.map((message, index) => (
                    <div key={index} className={`flex ${message.sender === 'AI' ? 'justify-start' : 'justify-end'}`}>
                      <div className={`p-2 rounded-lg ${message.sender === 'AI' ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}>
                        <p>{message.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="mt-4 flex">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                />
                <Button variant="outline" className="ml-2" onClick={handleSendMessage}>
                  <Send className="mr-2 h-4 w-4" /> Send
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard">
          <Card className="h-[400px]">
            <CardHeader>
              <CardTitle>Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              {leaderboard.length === 0 ? (
                <p>No leaderboard data yet.</p>
              ) : (
                <ul>
                  {leaderboard.map((player, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{player.name}</span>
                      <span>{player.score} points</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChallengePage;