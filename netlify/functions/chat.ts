import { buildSystemPrompt } from '../../src/data/systemPrompt';

type NetlifyConfig = {
  path: string;
  method?: string | string[];
};

declare const Netlify: {
  env: {
    get(name: string): string | undefined;
  };
};

const getEnvValue = (name: string) => {
  const netlifyEnv = globalThis.Netlify?.env?.get(name);
  return netlifyEnv ?? process.env[name];
};

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type ChatRequestBody = {
  messages?: ChatMessage[];
  isZh?: boolean;
  pagePath?: string;
};

const encoder = new TextEncoder();

const toSse = (payload: unknown) => encoder.encode(`data: ${JSON.stringify(payload)}\n\n`);

const sanitizeMessages = (messages: ChatMessage[] = []) =>
  messages
    .filter((message) => (message.role === 'user' || message.role === 'assistant') && typeof message.content === 'string')
    .slice(-12)
    .map((message) => ({
      role: message.role,
      content: message.content.slice(0, 8000),
    }));

export default async (request: Request): Promise<Response> => {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { Allow: 'POST', 'Content-Type': 'application/json' },
    });
  }

  const apiKey = getEnvValue('DEEPSEEK_API_KEY');
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Missing DEEPSEEK_API_KEY' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: ChatRequestBody;
  try {
    body = (await request.json()) as ChatRequestBody;
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const formattedMessages = [
    { role: 'system', content: buildSystemPrompt(!!body.isZh, body.pagePath) },
    ...sanitizeMessages(body.messages),
  ];

  const deepSeekResponse = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'deepseek-v4-pro',
      messages: formattedMessages,
      thinking: { type: 'enabled' },
      reasoning_effort: 'high',
      stream: true,
    }),
  });

  if (!deepSeekResponse.ok || !deepSeekResponse.body) {
    const errorText = await deepSeekResponse.text().catch(() => '');
    console.error('DeepSeek API error', {
      status: deepSeekResponse.status,
      statusText: deepSeekResponse.statusText,
      body: errorText.slice(0, 500),
    });

    return new Response(JSON.stringify({ error: 'Failed to reach chat provider' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const stream = new ReadableStream({
    async start(controller) {
      const reader = deepSeekResponse.body!.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';

          for (const line of lines) {
            if (line.trim() === '' || line.trim() === 'data: [DONE]') continue;
            if (!line.startsWith('data: ')) continue;

            try {
              const data = JSON.parse(line.slice(6));
              const delta = data.choices?.[0]?.delta;
              const outData: { text?: string; reasoning?: string } = {};

              if (delta?.content) outData.text = delta.content;
              if (delta?.reasoning_content) outData.reasoning = delta.reasoning_content;

              if (Object.keys(outData).length > 0) {
                controller.enqueue(toSse(outData));
              }
            } catch {
              controller.enqueue(toSse({ error: 'Chat stream parse failed' }));
            }
          }
        }
      } catch {
        controller.enqueue(toSse({ error: 'Chat stream interrupted' }));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
};

export const config: NetlifyConfig = {
  path: '/api/chat',
  method: 'POST',
};
