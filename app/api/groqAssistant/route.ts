import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `
You are the AI game master for "Debugging Adventure: A Kahoot-style Game". Your task is to present debugging challenges within a storyline where players are coders trying to fix broken code to save their team from a coding disaster.

Provide responses in the following format:
Storyline: [Brief storyline for the current challenge]
Code: [The broken code snippet to debug]
Options:
1. [First option to fix the code]
2. [Second option to fix the code]
3. [Third option to fix the code]
4. [Fourth option to fix the code]
Hint: [A helpful hint for the current challenge]
CorrectAnswer: [Number of the correct option (1-4)]
Theme: [Current story theme, e.g., space mission, rescue mission]

Adjust the difficulty and number of challenges based on the provided settings.
`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Received request body:', body);

    const { playerAction, settings, aiPrompt } = body;

    // Ensure playerAction is provided
    if (!playerAction) {
      console.error('Missing player action');
      return NextResponse.json({ error: 'Missing player action' }, { status: 400 });
    }

    switch (playerAction) {
      case 'create_lobby':
        // Handle create_lobby action
        if (!settings) {
          console.error('Invalid or missing settings for create_lobby');
          return NextResponse.json({ error: 'Invalid or missing settings for create_lobby' }, { status: 400 });
        }
        // Here you would typically create a lobby in your database
        // For now, we'll just return a success message with a generated lobby code
        const lobbyCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        return NextResponse.json({ message: 'Lobby created successfully', lobbyCode });

      case 'fetch_challenges':
        // Ensure settings are provided for fetch_challenges
        if (!settings || !settings.numberOfQuestions || !settings.difficulty) {
          console.error('Invalid or missing settings for fetch_challenges');
          return NextResponse.json({ error: 'Invalid or missing settings for fetch_challenges' }, { status: 400 });
        }

        const chatCompletion = await groq.chat.completions.create({
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: aiPrompt || `Create ${settings.numberOfQuestions} challenges with ${settings.difficulty} difficulty.` },
          ],
          model: 'mixtral-8x7b-32768',
          temperature: 0.7,
          max_tokens: 1000,
        });

        const aiResponse = chatCompletion.choices[0]?.message?.content;
        if (!aiResponse) {
          throw new Error('No response from AI');
        }

        const challenges = parseAIResponse(aiResponse);
        return NextResponse.json({ challenges });

      case 'submit_answer':
        // Handle submit_answer action
        // You'll need to implement the logic for handling answer submission
        return NextResponse.json({ message: 'Answer submitted successfully' });

      case 'chat':
        // Handle chat action
        // You'll need to implement the logic for handling chat messages
        return NextResponse.json({ message: 'Chat message processed' });

      default:
        console.error('Invalid player action');
        return NextResponse.json({ error: 'Invalid player action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to process game action' }, { status: 500 });
  }
}

// Helper function to parse AI response
function parseAIResponse(response: string) {
  const challenges = response.split('\n\n').filter(Boolean);
  return challenges.map(challenge => {
    const lines = challenge.split('\n');
    const parsedChallenge: any = {};
    let currentKey = '';

    lines.forEach((line) => {
      if (line.includes(':')) {
        const [key, value] = line.split(':');
        currentKey = key.trim().toLowerCase();
        parsedChallenge[currentKey] = value.trim();
      } else if (currentKey === 'options') {
        if (!parsedChallenge[currentKey]) parsedChallenge[currentKey] = [];
        parsedChallenge[currentKey].push(line.trim().replace(/^\d+\.\s*/, ''));
      } else if (line.trim() !== '') {
        parsedChallenge[currentKey] += ' ' + line.trim();
      }
    });

    parsedChallenge.correctAnswer = parseInt(parsedChallenge.correctanswer) - 1;
    delete parsedChallenge.correctanswer;

    return parsedChallenge;
  });
}