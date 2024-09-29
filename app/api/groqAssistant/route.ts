import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
});

const SYSTEM_PROMPT = `
You are an AI assistant for a portfolio website. Your task is to guide visitors through the portfolio based on their interests and background. Tailor your responses to whether they are a recruiter, developer, student, or general visitor. Suggest relevant sections of the portfolio to explore.

Available sections:
- #projects: Showcase of completed projects
- #skills: List of technical skills and competencies
- #blog: Technical blog posts and articles
- #about: Personal information and background
- #contact: Contact information and form

Provide concise, friendly responses and always suggest a relevant section to visit.
`;

export async function POST(req: Request) {
  try {
    const body = await req.json() as { conversation: Array<{ role: string; content: string }> };

    if (!body.conversation || body.conversation.length === 0) {
      return NextResponse.json({ error: 'No conversation provided' }, { status: 400 });
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...body.conversation
      ],
      model: 'mixtral-8x7b-32768',
      temperature: 0.7,
      max_tokens: 150,
    });

    const aiResponse = chatCompletion.choices[0]?.message?.content || 'No response';
    
    // Simple parsing for navigation suggestion
    let navigation = '';
    if (aiResponse.includes('#projects')) navigation = '#projects';
    else if (aiResponse.includes('#skills')) navigation = '#skills';
    else if (aiResponse.includes('#blog')) navigation = '#blog';
    else if (aiResponse.includes('#about')) navigation = '#about';
    else if (aiResponse.includes('#contact')) navigation = '#contact';

    return NextResponse.json({
      response: aiResponse,
      navigation: navigation
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to fetch AI response' }, { status: 500 });
  }
}