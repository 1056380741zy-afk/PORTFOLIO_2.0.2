import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { GoogleGenAI } from "@google/genai";

// --- 1:1 复刻的 Suha 机器人组件 ---
interface SuhaBotProps {
  size?: number;
  isThinking?: boolean;
  showBackground?: boolean;
  className?: string;
}

const SuhaBot: React.FC<SuhaBotProps> = ({ 
  size = 100, 
  isThinking = false, 
  showBackground = true,
  className = "" 
}) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      initial="initial"
    >
      {/* 背景紫色圆圈 */}
      {showBackground && (
        <circle cx="50" cy="50" r="42" fill="#8e6bbf" />
      )}

      {/* 机器人整体跳动逻辑 */}
      <motion.g
        animate={{
          y: [0, -12, -15, -12, 0],
          scaleX: [1, 0.98, 1, 0.98, 1.05, 1],
          scaleY: [1, 1.05, 1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: isThinking ? 1.2 : 3, // 思考时跳动频率加快
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "bottom center" }}
      >
        {/* 天线：信号晃动 */}
        <motion.path
          d="M50 36 V32 H53"
          stroke="white"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          animate={{ rotate: isThinking ? [-15, 15, -15] : [-8, 8, -8] }}
          transition={{ duration: isThinking ? 0.4 : 2, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "50px 36px" }}
        />

        {/* 身体主体 */}
        <rect x="32" y="40" width="36" height="25" rx="7" stroke="white" strokeWidth="3" fill="none" />

        {/* 侧边接口 */}
        <line x1="28" y1="52.5" x2="32" y2="52.5" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <line x1="68" y1="52.5" x2="72" y2="52.5" stroke="white" strokeWidth="3" strokeLinecap="round" />

        {/* 眼睛：张望 + 眨眼 */}
        <motion.g
          animate={{ x: isThinking ? [0, 0] : [0, -2, -2, 2, 2, 0] }}
          transition={{ duration: 6, repeat: Infinity, times: [0, 0.3, 0.45, 0.55, 0.7, 1] }}
        >
          <motion.g
            animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.48, 0.5, 0.52, 1] }}
            style={{ transformOrigin: "50% 52px" }}
          >
            <rect x="42" y="48" width="2.5" height="8" rx="1.25" fill="white" />
            <rect x="55.5" y="48" width="2.5" height="8" rx="1.25" fill="white" />
          </motion.g>
        </motion.g>
      </motion.g>
    </motion.svg>
  );
};

// --- 主组件 AIChat ---
export const AIChat: React.FC = () => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const callGemini = async (userMessage: string, systemInstruction: string) => {
    try {
      const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMessage,
        config: {
          systemInstruction: systemInstruction,
        },
      });
      return response.text;
    } catch (error) {
      console.error("Gemini API Error:", error);
      return t.aiChat.error;
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    const systemInstruction = `
        # AI Agent Prompt: Suha
        ... (保持你原来的 prompt 不变)
      `;

    try {
      const responseText = await callGemini(userMessage, systemInstruction);
      setMessages(prev => [...prev, { role: 'bot', content: responseText || t.aiChat.error }]);
    } catch (error) {
      console.error("AI Chat Error:", error);
      setMessages(prev => [...prev, { role: 'bot', content: t.aiChat.error }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button - 使用 SuhaBot 替换 Bot 图标 */}
      <div className="fixed bottom-6 right-6 z-[60]">
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-[#8e6bbf] text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-[#7e4ba6] transition-colors overflow-hidden"
        >
          <SuhaBot size={45} showBackground={false} />
        </motion.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-[60] w-[90vw] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          >
            {/* Header - 使用小型 SuhaBot */}
            <div className="p-4 bg-[#8e6bbf] text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <SuhaBot size={28} showBackground={false} />
                <span className="font-bold">{t.aiChat.title}</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
              {messages.length === 0 && (
                <div className="text-center py-8 px-4">
                  <div className="w-16 h-16 bg-[#8e6bbf]/10 text-[#8e6bbf] rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                    <SuhaBot size={40} showBackground={false} />
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {t.aiChat.welcome}
                  </p>
                </div>
              )}
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-[#8e6bbf] text-white rounded-tr-none' 
                      : 'bg-white border border-gray-100 text-gray-700 rounded-tl-none shadow-sm'
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      {/* Bot 消息头像使用带背景的 SuhaBot */}
                      {msg.role === 'bot' ? (
                        <SuhaBot size={22} showBackground={true} className="flex-shrink-0" />
                      ) : (
                        <User size={14} className="opacity-70" />
                      )}
                      <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">
                        {msg.role === 'user' ? 'You' : 'Suha'}
                      </span>
                    </div>
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* 加载状态 - 使用 isThinking 模式的 SuhaBot */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 p-2 px-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                    <SuhaBot size={24} isThinking={true} showBackground={false} />
                    <span className="text-[10px] text-gray-400 font-medium animate-pulse">SUHA IS THINKING...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input ... (保持原来的 Input 部分代码) */}
            <div className="p-4 bg-white border-t border-gray-100">
               <div className="flex gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder={t.aiChat.placeholder}
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#8e6bbf] transition-colors resize-none h-24 max-h-48"
                  rows={3}
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="w-10 h-10 bg-[#8e6bbf] text-white rounded-xl flex items-center justify-center hover:bg-[#7e4ba6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed self-end"
                >
                  <Send size={18} />
                </button>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Powered by Gemini AI</span>
                <button 
                  onClick={() => setInput("Here is a JD: ")}
                  className="text-[10px] text-[#8e6bbf] font-bold uppercase tracking-wider hover:underline"
                >
                  {t.aiChat.matchBtn}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
