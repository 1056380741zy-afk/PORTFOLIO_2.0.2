import React, { useState, useRef, useEffect } from 'react';
import { Send, User, X, MessageSquare, ChevronRight, Terminal } from 'lucide-react';
// 👇 导入你亲手写的灵魂小机器人！
import { SuhaBot } from './SuhaBot';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  reasoning?: string;
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
      let buffer = '';

      setMessages(prev => [...prev, { role: 'assistant', content: '', reasoning: '' }]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.trim() === '') continue;
          
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6).trim();
            if (dataStr === '[DONE]') continue;

            try {
              const data = JSON.parse(dataStr);
              if (data.error) throw new Error(data.error);
              
              if (data.text) currentText += data.text;
              if (data.reasoning) currentReasoning += data.reasoning;

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
              // Ignore partial JSON
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
      {/* 悬浮唤醒按钮：紫色主题 */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-[#8e6bbf] text-white shadow-lg shadow-[#8e6bbf]/30 transition-all duration-300 hover:scale-110 hover:bg-[#7e4ba6] z-50 flex items-center justify-center ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* 聊天窗口主容器：明亮清新白底 */}
      <div className={`fixed bottom-6 right-6 w-[90vw] max-w-[400px] h-[600px] max-h-[80vh] bg-white border border-gray-100 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 z-50 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        
        {/* 头部 Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-3">
            {/* 头像处加载你的 SuhaBot！ */}
            <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
              <SuhaBot size={44} isThinking={isLoading} showBackground={true} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">Suha Assistant</h3>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8e6bbf] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8e6bbf]"></span>
                </span>
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">DeepSeek AI</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="p-2 rounded-xl hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 聊天消息区域 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent bg-white">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              
              {/* AI 的气泡 */}
              {msg.role === 'assistant' && (
                <div className="flex items-start gap-2.5 w-full">
                  <div className="w-8 h-8 flex-shrink-0 mt-1">
                    {/* 消息列表里的迷你版小机器人，连上 isLoading 让它能感知思考状态！ */}
                    <SuhaBot size={32} isThinking={isLoading && index === messages.length - 1} showBackground={true} />
                  </div>
                  
                  <div className="flex-1 max-w-[85%]">
                    {/* DeepSeek 专属：紫色系的思考过程折叠面板 */}
                    {msg.reasoning && (
                      <details className="mb-2 group relative rounded-lg border border-[#8e6bbf]/20 bg-[#8e6bbf]/5 overflow-hidden">
                        <summary className="cursor-pointer list-none flex items-center gap-2 p-2.5 text-xs font-medium text-gray-500 hover:text-[#8e6bbf] transition-colors select-none">
                          <Terminal className="w-3.5 h-3.5 text-[#8e6bbf]/70" />
                          <span>AI Reasoning Process</span>
                          <ChevronRight className="w-3.5 h-3.5 ml-auto transition-transform group-open:rotate-90 text-gray-400" />
                        </summary>
                        <div className="p-3 pt-0 text-xs text-gray-500 font-mono leading-relaxed whitespace-pre-wrap border-t border-[#8e6bbf]/10">
                          {msg.reasoning}
                        </div>
                      </details>
                    )}
                    
                    {/* 正式回答内容：灰色气泡 */}
                    {(msg.content || (isLoading && index === messages.length - 1 && !msg.reasoning)) && (
                      <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-sm p-3.5 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed shadow-sm">
                        {msg.content || (
                          <div className="flex items-center gap-1 h-5">
                            <span className="w-1.5 h-1.5 bg-[#8e6bbf]/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                            <span className="w-1.5 h-1.5 bg-[#8e6bbf]/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                            <span className="w-1.5 h-1.5 bg-[#8e6bbf]/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 用户的气泡：你的专属紫色 */}
              {msg.role === 'user' && (
                <div className="flex items-start gap-2.5 max-w-[85%] flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 flex-shrink-0 mt-1">
                    <User className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="bg-[#8e6bbf] text-white rounded-2xl rounded-tr-sm p-3.5 text-sm whitespace-pre-wrap leading-relaxed shadow-md">
                    {msg.content}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* 输入框区域 */}
        <div className="p-4 border-t border-gray-100 bg-white">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Suha anything..."
              disabled={isLoading}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-4 pr-12 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#8e6bbf] transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 w-8 h-8 rounded-lg bg-[#8e6bbf] text-white hover:bg-[#7e4ba6] disabled:opacity-50 disabled:hover:bg-[#8e6bbf] transition-colors flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="mt-2 text-center">
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Powered by DeepSeek AI</span>
          </div>
        </div>
      </div>
    </>
  );
}
