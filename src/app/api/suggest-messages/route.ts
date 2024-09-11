import { OpenAI } from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Corrected the environment variable key
});

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const prompt = `Create a list of three open-ended and engaging questions formatted as a single string. 
    Each question should be separated by '||'. These questions are for an anonymous social messaging platform like Qooh.me 
    and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes 
    and encourage friendly interaction. For example, your output should be structured like this: 
    What's a hobby you have recently started? || If you could have dinner with any historical figure, who would it be? 
    || What is something that makes you happy? Ensure the questions are intriguing, foster curiosity, and contribute to a 
    positive and welcoming conversation environment.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
      stream: true,
      max_tokens: 300,
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);

  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      return NextResponse.json({
        name, status, headers, message,
      }, { status });
    } else {
      console.error('An unexpected error occurred:', error);
      throw error;
    }
  }
}
