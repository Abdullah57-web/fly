import { createTextStreamResponse } from 'ai';
import { z } from 'zod';

const leadScoreSchema = z.object({
  leadName: z.string(),
  company: z.string()
});

export async function POST(req: Request) {
  return createTextStreamResponse({
    execute: async (dataStream) => {
      dataStream.writeMessageAnnotation({ 
        type: 'tool-status', 
        state: 'input-streaming', 
        message: 'Analyzing lead metrics via schema...' 
      });
      await new Promise(r => setTimeout(r, 1200));

      dataStream.writeMessageAnnotation({ 
        type: 'tool-status', 
        state: 'input-available', 
        data: { leadName: 'John Doe', company: 'Acme Corp' } 
      });
      await new Promise(r => setTimeout(r, 1400));

      dataStream.writeMessageAnnotation({
        type: 'tool-result',
        state: 'output-available',
        result: { 
          score: 85, 
          conversionProbability: 'High', 
          status: 'Hot Lead', 
          recommendations: ['Schedule immediate discovery call', 'Send automated case studies'] 
        }
      });
    }
  });
}
