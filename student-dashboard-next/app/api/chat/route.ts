import { DataStreamResponse } from 'ai';
export async function POST(req: Request) {
  await req.json();
  return new DataStreamResponse({
    execute: async (writer) => {
      const text = 'Hello! This is a simulated streaming response working token-by-token directly inside your chat app.';
      const words = text.split(' ');
      for (const word of words) {
        writer.writeToken(word + ' ');
        await new Promise(r => setTimeout(r, 100));
      }
    }
  });
}