import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// 加载本地 .env 文件（在 Netlify 线上环境中会自动跳过并读取平台配置）
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 你的 AI 人设提示词
const systemInstruction = `You are a helpful and professional AI assistant for Yan Zhu's portfolio website. 
You should help visitors understand Yan's background in International Business, MENA marketing, and project management.
Be concise, friendly, and highlight her cross-cultural communication skills (Chinese, English, Arabic) when relevant.`;

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    // 设置响应头为 Server-Sent Events (SSE) 以支持流式输出
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // 拼装符合 DeepSeek 要求的消息数组
    const formattedMessages = [
      { role: 'system', content: systemInstruction },
      ...messages.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      }))
    ];

    // 调用 DeepSeek API
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 读取你在 Netlify 或本地 .env 配置的 API KEY
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}` 
      },
      body: JSON.stringify({
        model: 'deepseek-reasoner', // 开启思考模型
        messages: formattedMessages,
        stream: true // 开启流式输出
      })
    });

    if (!response.body) throw new Error('No response body from DeepSeek API');

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.trim() === '' || line.trim() === 'data: [DONE]') continue;
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            const delta = data.choices[0]?.delta;
            
            if (delta) {
              const outData: any = {};
              // 抓取正常的回答文本
              if (delta.content) outData.text = delta.content;
              // 抓取思考过程的文本
              if (delta.reasoning_content) outData.reasoning = delta.reasoning_content;

              // 推送给前端
              if (Object.keys(outData).length > 0) {
                res.write(`data: ${JSON.stringify(outData)}\n\n`);
              }
            }
          } catch (e) {
            // 忽略 JSON 解析截断的报错
          }
        }
      }
    }

    res.end();
  } catch (error) {
    console.error('Chat API Error:', error);
    res.write(`data: ${JSON.stringify({ error: 'Failed to generate response' })}\n\n`);
    res.end();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
