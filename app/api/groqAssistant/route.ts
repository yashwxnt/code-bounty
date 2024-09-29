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
`;

export async function POST(req: Request) {
  console.log('API route hit');

  try {
    const body = await req.json() as {
      gameState: {
        chapter: number;
        score: number;
        theme: string;
      };
      playerAction: string;
    };

    console.log('Received body:', body);

    if (!body.gameState || !body.playerAction) {
      return NextResponse.json({ error: 'Invalid game state or player action' }, { status: 400 });
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: JSON.stringify(body) }
      ],
      model: 'mixtral-8x7b-32768',
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiResponse = chatCompletion.choices[0]?.message?.content;
    if (!aiResponse) {
      throw new Error('No response from AI');
    }

    console.log('AI Response:', aiResponse);

    // Parse the AI response manually
    const parseAIResponse = (response: string) => {
      const lines = response.split('\n');
      const challenge: any = {};
      let currentKey = '';
      
      lines.forEach(line => {
        if (line.includes(':')) {
          const [key, value] = line.split(':');
          currentKey = key.trim().toLowerCase();
          challenge[currentKey] = value.trim();
        } else if (currentKey === 'options') {
          if (!challenge[currentKey]) challenge[currentKey] = [];
          challenge[currentKey].push(line.trim().replace(/^\d+\.\s*/, ''));
        } else if (line.trim() !== '') {
          challenge[currentKey] += ' ' + line.trim();
        }
      });

      challenge.correctAnswer = parseInt(challenge.correctanswer) - 1;
      delete challenge.correctanswer;

      return challenge;
    };

    const challenge = parseAIResponse(aiResponse);

    return NextResponse.json({ challenges: [challenge] });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to process game action' }, { status: 500 });
  }
}