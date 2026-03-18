import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, Sparkles, MessageSquare, ChevronRight, Terminal } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  reasoning?: string; // DeepSeek 思考过程字段
}

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Yan's AI assistant. Feel free to ask me anything about her background in the MENA market, project management, or cross-cultural experiences!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // 兼容本地开发和线上部署
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }],
        }),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let currentText = '';
      let currentReasoning = '';

      // 先推入一个空的 assistant 消息占位，准备接收流式数据
      setMessages(prev => [...prev, { role: 'assistant', content: '', reasoning: '' }]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.trim() === '') continue;
          
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6).trim();
            // 防止读到最后一行报错
            if (dataStr === '[DONE]') continue;

            try {
              const data = JSON.parse(dataStr);
              if (data.error) throw new Error(data.error);
              
              if (data.text) currentText += data.text;
              if (data.reasoning) currentReasoning += data.reasoning;

              // 实时更新最后一条消息
              setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                  role: 'assistant',
                  content: currentText,
                  reasoning: currentReasoning
                };
                return newMessages;
              });
            } catch (e) {
              // 忽略截断的 JSON
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Connection lost or server error. Please try again.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* 悬浮唤醒按钮 */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* 聊天窗口主容器 */}
      <div className={`fixed bottom-6 right-6 w-[90vw] max-w-[400px] h-[600px] max-h-[80vh] bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 z-50 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        
        {/* 头部 Header */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm">Yan's AI Assistant</h3>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs text-emerald-400/80 font-mono">DeepSeek V3.2</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="p-2 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 聊天消息区域 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              
              {/* AI 的气泡 */}
              {msg.role === 'assistant' && (
                <div className="flex items-start gap-3 w-full">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-gray-300" />
                  </div>
                  
                  <div className="flex-1 max-w-[85%]">
                    {/* 👇 DeepSeek 专属：思考过程折叠面板 */}
                    {msg.reasoning && (
                      <details className="mb-2 group relative rounded-lg border border-white/10 bg-black/30 overflow-hidden">
                        <summary className="cursor-pointer list-none flex items-center gap-2 p-2.5 text-xs font-medium text-gray-400 hover:text-emerald-400 transition-colors select-none">
                          <Terminal className="w-3.5 h-3.5 text-emerald-500/70" />
                          <span>AI Reasoning Process</span>
                          <ChevronRight className="w-3.5 h-3.5 ml-auto transition-transform group-open:rotate-90" />
                        </summary>
                        <div className="p-3 pt-0 text-xs text-gray-400 font-mono leading-relaxed whitespace-pre-wrap border-t border-white/5 opacity-80">
                          {msg.reasoning}
                        </div>
                      </details>
                    )}
                    
                    {/* 正式回答内容 */}
                    {(msg.content || (isLoading && index === messages.length - 1 && !msg.reasoning)) && (
                      <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm p-3.5 text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">
                        {msg.content || (
                          <div className="flex items-center gap-1 h-5">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 用户的气泡 */}
              {msg.role === 'user' && (
                <div className="flex items-start gap-3 max-w-[85%] flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 flex-shrink-0 mt-1">
                    <User className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="bg-emerald-500/90 text-white rounded-2xl rounded-tr-sm p-3.5 text-sm whitespace-pre-wrap leading-relaxed shadow-lg">
                    {msg.content}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* 输入框区域 */}
        <div className="p-4 border-t border-white/10 bg-black/20">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              disabled={isLoading}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 p-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-400 disabled:opacity-50 disabled:hover:bg-emerald-500 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
