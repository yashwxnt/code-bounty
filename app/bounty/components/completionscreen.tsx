import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react'

const CompletionScreen = ({ score, onRestart }) => (
    <Card>
      <CardHeader>
        <CardTitle>Congratulations!</CardTitle>
      </CardHeader>
      <CardContent>
        <p>You've completed all challenges.</p>
        <p className="text-2xl font-bold mt-4">Your final score: {score}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={onRestart}>Play Again</Button>
      </CardFooter>
    </Card>
  );

export default completionscreen