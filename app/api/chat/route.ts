import { OpenAIStream, StreamingTextResponse } from 'ai';
import { Configuration, OpenAIApi } from 'openai-edge'; 
import { functions } from './functions';

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);
 
export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();
 
  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
        {role:"system", content:"You are a helpful assistant that helps financial advisors fill out W-9s and subscription documents for their clients."},
        ...messages
    ],
    functions,
    function_call: "auto",
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}