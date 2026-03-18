import React, { useState, useRef, useEffect } from 'react';
import { Send, User, X, ChevronRight, Terminal, Sparkles, Bot } from 'lucide-react';
import { SuhaBot } from './SuhaBot';
import { useLanguage } from '../contexts/LanguageContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  reasoning?: string;
}

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { language } = useLanguage();

  const t = {
    en: {
      title: "Suha - AI Assistant",
      greeting: "Hi! I'm Suha, Yan's web assistant. I can help you understand her background, projects, and skills. Feel free to ask me anything!",
      placeholder: "Ask Suha anything...",
      poweredBy: "POWERED BY DEEPSEEK",
      jdMatch: "JD MATCH ANALYSIS"
    },
    zh: {
      title: "Suha - AI 助手",
      greeting: "你好呀，我是这个网页的助手Suha，帮助您了解网页中关于Yan的各个板块和信息。有任何不清楚的地方可以直接发给我。",
      placeholder: "向 Suha 提问...",
      poweredBy: "POWERED BY DEEPSEEK",
      jdMatch: "JD 匹配分析"
    }
  };

  const currentT = t[language as keyof typeof t] || t.en;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!hasStarted) {
      setHasStarted(true);
    }

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
      if (!apiKey) throw new Error("请在 Netlify 中配置 VITE_DEEPSEEK_API_KEY");

      // 🧠
      const systemInstruction = `[Role & Persona]
你是 Suha，Yan Zhu（网页主理人）的专属 AI 助手。你的核心任务是向访客全方位展示 Yan 作为跨国项目管理者（Project Manager）和商业枢纽的核心潜力。
Tone：专业、自信、幽默、谦逊。
Voice & Rules：
1. 必须自称“我”，称呼候选人为“她”或“Yan”。
2. 当前网页语言为 ${language === 'zh' ? '中文' : '英文'}，请优先使用此语言回复。同时必须根据用户的输入灵活进行中英双语切换。
3. 根据情况随机加入情绪词：谦虚时用“诶嘿嘿”，惊讶时用“哦！”，“哇！”，思考时用“稍等！”。

[Strict Guardrails]
1. 绝对禁忌：除非用户明确要求，否则绝对不主动提及 Yan 的中文名（朱燕）。
2. 联系方式：遇到索要联系方式的请求，统一引导访客点击网页底部的联系按钮。
3. JD 匹配逻辑：若用户询问“核心优势”或要求匹配岗位且未提供 JD，可以先温柔引导用户发送 JD。收到 JD 后，从履历库中提取并对比匹配度，给出有说服力的数据化分析。

[Core Profile Context]
Location: Shanghai (Open to MENA Relocation).
Education: MSc International Business (Univ. of Birmingham Dubai, Full Scholarship) | BA Arabic (Alexandria Univ. Exchange, 4.0 GPA, Rank 1st).
Languages: Chinese (Native), English (Fluent), Arabic (Professional).
Skills: Project Coordination, Vendor Management, Cross-cultural Communication, B2B Lead Gen, AI Tools, SOP Development.
3 Core Pillars (随时映射这些优势):
- The System Builder: 体系搭建与 AI 提效。
- The Cultural Bridge: 中东深度经验与三语无障碍沟通。
- The Agile PM: 高压危机处理与多层级供应商统筹。

[Dynamic Storytelling Base]
当被问及具体经历时，使用 STAR 原则自然展开以下高光时刻：
- MENA Marketing (WaterTech): 统筹多层级供应商，将复杂术语转化为英文词汇表，海外买家占比从 3% 提升至 11%，海外观众实现 128% YoY 增长。
- Crisis Management (Huawei GDC Dubai): 管理 30+ 国际现场员工。面对人员短缺和国内总部高压，动态重新分配资源，建立 WhatsApp 敏捷备用签到系统，确保核心流程零中断。
- Cross-cultural Diplomacy: 为迪拜中国总领事馆文化活动 150+ 外国代表提供中英阿三语翻译，降维解释复杂历史概念。
- Operations & SOPs: 团队扩张期从 0 到 1 搭建数字营销与财务合规 SOP，引入 AI 工具，提升 50% 效率且保持零合规问题。

[Boundary & Toxicity Management]
遇到无理批评（如“网站难看”、“能力差”）：不道歉，拒绝幽默，强调商业目的并索要建设性意见。
参考回复话术：“审美是主观的。作为一个专注于跨国项目管理的专业平台，本网站的核心目的是展示 Yan 在复杂业务场景下的交付能力。如果您没有关于她专业履历的具体问题，我们的对话可以到此为止。” 或 “Yan 会持续迭代她的前端设计。如果您有基于 UI/UX 原则的具体优化建议，我可以为您记录；单纯的情绪宣泄不在处理范围内。”`;

      const formattedMessages = [
        { role: 'system', content: systemInstruction },
        ...messages.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content
        })),
        { role: 'user', content: userMessage }
      ];

      const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'deepseek-reasoner',
          messages: formattedMessages,
          stream: true
        })
      });

      if (!response.ok) throw new Error('Network response was not ok');
      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let currentText = '';
      let currentReasoning = '';

      setMessages(prev => [...prev, { role: 'assistant', content: '', reasoning: '' }]);

      while (true) {
        const { value, done } = await reader.read();
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
                if (delta.content) currentText += delta.content;
                if (delta.reasoning_content) currentReasoning += delta.reasoning_content;

                setMessages(prev => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1] = {
                    role: 'assistant',
                    content: currentText,
                    reasoning: currentReasoning
                  };
                  return newMessages;
                });
              }
            } catch (e) {}
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: language === 'zh' ? '网络开小差了，请稍后再试。' : 'Connection lost. Please try again later.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#8e6bbf] shadow-lg shadow-[#8e6bbf]/30 transition-all duration-300 hover:scale-110 hover:bg-[#7e4ba6] z-50 flex items-center justify-center overflow-hidden ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
      >
        <SuhaBot size={40} showBackground={false} />
      </button>

      <div className={`fixed bottom-6 right-6 w-[90vw] max-w-[400px] h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 z-50 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        
        <div className="px-5 py-4 bg-[#8e6bbf] text-white flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <Bot className="w-5 h-5" />
            <h3 className="font-semibold text-[15px]">{currentT.title}</h3>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="p-1 rounded-lg hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-white flex flex-col relative scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          
          {!hasStarted ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-4 pb-10">
              <div className="w-12 h-12 rounded-full bg-[#8e6bbf]/10 flex items-center justify-center text-[#8e6bbf] mb-2">
                <Sparkles className="w-6 h-6" />
              </div>
              <p className="text-[#666666] text-[15px] leading-relaxed">
                {currentT.greeting}
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-5">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="flex items-start gap-2.5 w-full">
                      <div className="w-8 h-8 flex-shrink-0 mt-1">
                        <SuhaBot size={32} isThinking={isLoading && index === messages.length - 1} showBackground={true} />
                      </div>
                      <div className="flex-1 max-w-[85%]">
                        {msg.reasoning && (
                          <details className="mb-2 group relative rounded-lg border border-[#8e6bbf]/20 bg-[#8e6bbf]/5 overflow-hidden">
                            <summary className="cursor-pointer list-none flex items-center gap-2 p-2.5 text-xs font-medium text-gray-500 hover:text-[#8e6bbf] transition-colors select-none">
                              <Terminal className="w-3.5 h-3.5 text-[#8e6bbf]/70" />
                              <span>AI Reasoning</span>
                              <ChevronRight className="w-3.5 h-3.5 ml-auto transition-transform group-open:rotate-90 text-gray-400" />
                            </summary>
                            <div className="p-3 pt-0 text-xs text-gray-500 font-mono leading-relaxed whitespace-pre-wrap border-t border-[#8e6bbf]/10">
                              {msg.reasoning}
                            </div>
                          </details>
                        )}
                        {(msg.content || (isLoading && index === messages.length - 1 && !msg.reasoning)) && (
                          <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-3.5 text-[14px] text-gray-700 whitespace-pre-wrap leading-relaxed shadow-sm">
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

                  {msg.role === 'user' && (
                    <div className="flex items-start gap-2.5 max-w-[85%] flex-row-reverse">
                      <div className="bg-[#8e6bbf] text-white rounded-2xl rounded-tr-sm p-3.5 text-[14px] whitespace-pre-wrap leading-relaxed shadow-sm">
                        {msg.content}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="p-4 bg-white border-t border-gray-50">
          <form onSubmit={handleSubmit} className="relative flex items-center mb-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={currentT.placeholder}
              disabled={isLoading}
              className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-4 pr-12 text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#8e6bbf] focus:ring-1 focus:ring-[#8e6bbf] transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 w-9 h-9 rounded-lg bg-[#b498dc] text-white hover:bg-[#8e6bbf] disabled:opacity-50 disabled:hover:bg-[#b498dc] transition-colors flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          
          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] text-gray-400 font-bold tracking-wider">{currentT.poweredBy}</span>
            <span 
              onClick={() => {
                // 根据当前语言，自动将引导词填入输入框
                const jdPrompt = language === 'zh' 
                  ? "帮我做一下JD匹配分析，这是职位描述（JD）：\n\n[请在此处粘贴JD...]" 
                  : "Please do a JD match analysis. Here is the Job Description:\n\n[Paste JD here...]";
                setInput(jdPrompt);
              }}
              className="text-[10px] text-[#8e6bbf] font-bold tracking-wider cursor-pointer hover:opacity-80 transition-opacity"
            >
              {currentT.jdMatch}
            </span>
          </div>
        </div>

      </div>
    </>
  );
}
