import { createDataStreamResponse } from 'ai';
export async function POST(req: Request) {
  await req.json();
  return createDataStreamResponse({
    execute: async (dataStream) => {
      const text = 'Hello! This is a simulated streaming response working token-by-token directly inside your chat app.';
      const words = text.split(' ');
      for (const word of words) {
        dataStream.writeToken(word + ' ');
        await new Promise(r => setTimeout(r, 100));
      }
    }
  });
}