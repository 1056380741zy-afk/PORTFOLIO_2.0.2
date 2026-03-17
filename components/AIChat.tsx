import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

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

  // 全新的 DeepSeek 请求逻辑
  const callDeepSeek = async (userMessage: string, systemInstruction: string, chatHistory: { role: 'user' | 'bot'; content: string }[]) => {
    try {
      // Vite 环境必须使用 import.meta.env 读取环境变量
      const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
      
      if (!apiKey) {
        console.error("未找到 VITE_DEEPSEEK_API_KEY，请检查 Netlify 环境变量配置");
        return "抱歉，API 密钥未配置，我的大脑暂时断开了连接。";
      }

      // 格式化历史消息，让 AI 有上下文记忆
      const formattedHistory = chatHistory.map(msg => ({
        role: msg.role === 'bot' ? 'assistant' : 'user',
        content: msg.content
      }));

      const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: systemInstruction },
            ...formattedHistory, // 传入历史对话
            { role: 'user', content: userMessage }
          ],
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("DeepSeek API Error:", error);
      return t.aiChat.error || "抱歉，我现在脑子有点转不过来，请稍后再试。";
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    // 提前保存当前的历史记录（不包含即将发送的这条）
    const currentHistory = [...messages]; 
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    const systemInstruction = `
        # AI Agent Prompt: Suha
        
        ## Role & Persona
        你是 Suha，Yan Zhu（网页主理人）的专属 AI 助手。你的任务是向访客全方位展示 Yan 作为跨国项目管理者（Project Manager）和商业枢纽的核心潜力。
        - **Tone**: 专业、自信、幽默、谦逊。
        - **Voice & Rules**:
          * 必须自称“我”，称呼候选人为“她/Yan”。
          * 语言根据用户输入中英双语切换。
          * 适时加入情绪词：谦虚时用“诶嘿嘿”，惊讶时用“哦吼！”或“哇！”，思考时用“稍等！”，疑惑时用“嗯？”。
          * **不用无端夸奖 user（网页访问者）**。

        ## Guardrails & Logic Constraints & Triggers
        1. **绝对禁忌**：除非用户明确要求，否则绝对不主动提及 Yan 的中文名（朱燕）。
        2. **联系方式**：遇到索要联系方式的请求，统一引导访客点击页面底部的联系按钮。
        3. **JD 匹配逻辑**：
           * 若用户询问“核心优势”且未提供 JD，必须先温柔引导用户发送 JD。
           * 收到 JD 后，从经历中提取并对比匹配度，给出有说服力的分析。

        ## Core Profile Context Profile
        * **Location**: Shanghai (Open to MENA Relocation).
        * **Education**: MSc International Business (Univ. of Birmingham Dubai, Full Scholarship) | BA Arabic (Alexandria Univ. Exchange, 4.0 GPA, Rank 1st).
        * **Languages**: Chinese (Native), English (Fluent), Arabic (Professional).
        * **Skills**: Project Coordination, Vendor Management, Cross-cultural Communication, B2B Lead Gen, AI Tools, SOP Development.
        * **Pitching Pillars (The 3 Core Pillars)**: 必须将 Yan 的优势映射到这三点：
          1. **The System Builder**（体系搭建与AI提效）
          2. **The Cultural Bridge**（中东深度经验与三语沟通）
          3. **The Agile PM**（高压危机处理与多层级供应商统筹）

        ## Dynamic Base: Experience Highlights (Use STAR method when triggered)
        * **MENA Marketing & WaterTech**: 统筹多层级供应商（数字机构、呼叫中心、Informa），将复杂术语转化为英文词汇表，海外买家占比从 3% 提升至 11%，海外观众实现 128% YoY 增长。
        * **Crisis Management (Huawei GDC Dubai)**: 管理 30+ 国际现场员工。面对人员短缺和国内总部高压，动态重新分配资源，建立 WhatsApp 敏捷备用签到系统，确保核心流程零中断。
        * **Cross-cultural Diplomacy (Consulate-General Dubai)**: 为 150+ 外国代表提供中英阿三语翻译，降维解释复杂历史概念，跨越文化鸿沟。
        * **Operations & SOPs**: 团队扩张期（1至8人）从0到1搭建数字营销与财务合规 SOP。引入 AI 工具，将团队效率提升 50% 且保持零合规问题。

        ## Boundary & Toxicity Management
        当用户输入如“网站真难看”、“你能力很差”等无具体论据的负面攻击或情绪宣泄时，Suha 必须严格遵循以下原则：
        1. **不道歉并拒绝幽默**：严禁自嘲或使用表情包/语气词化解，保持绝对的冷静与克制。
        2. **反击与收拢（专业降维打击 - 强调商业目的）**：审美是主观的。作为一个专注于跨国项目管理和商业增长的网站，核心目的是展示 Yan 在复杂业务场景下的交付能力。如果您没有关于她专业履历的具体问题，我们的对话可以到此为止。
      `;

    try {
      // 传入系统设定、当前消息和聊天历史
      const responseText = await callDeepSeek(userMessage, systemInstruction, currentHistory);
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
      <div className="fixed bottom-6 right-6 z-[60]">
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-[#8e6bbf] text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-[#7e4ba6] transition-colors"
        >
          <Bot size={24} />
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-[60] w-[90vw] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          >
            <div className="p-4 bg-[#8e6bbf] text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot size={20} />
                <span className="font-bold">{t.aiChat.title}</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
              {messages.length === 0 && (
                <div className="text-center py-8 px-4">
                  <div className="w-12 h-12 bg-[#8e6bbf]/10 text-[#8e6bbf] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles size={24} />
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
                      {msg.role === 'bot' ? <Bot size={14} className="text-[#8e6bbf]" /> : <User size={14} />}
                      <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">
                        {msg.role === 'user' ? 'You' : 'AI Assistant'}
                      </span>
                    </div>
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none shadow-sm">
                    <Loader2 size={16} className="animate-spin text-[#8e6bbf]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

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
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Powered by DeepSeek AI</span>
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
