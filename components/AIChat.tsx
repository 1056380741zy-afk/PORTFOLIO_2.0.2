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

  // 增强语言识别：兼容 zh, zh-CN, cn 等不同写法
  const isZh = language && (language.toLowerCase().includes('zh') || language.toLowerCase().includes('cn'));

  const t = {
    en: {
      title: "Suha - AI Assistant",
      greeting: "Hi! I'm Suha, Yan's web assistant. I can help you understand her background, projects, and skills. Feel free to ask me anything!",
      placeholder: "Ask Suha anything... (Shift + Enter for new line)",
      poweredBy: "POWERED BY DEEPSEEK",
      jdMatch: "JD MATCH ANALYSIS"
    },
    zh: {
      title: "Suha - AI 助手",
      greeting: "你好呀，我是这个网页的助手Suha，帮助您了解网页中关于Yan的各个板块和信息。有任何不清楚的地方可以直接发给我。",
      placeholder: "向 Suha 提问... (Shift + Enter 换行)",
      poweredBy: "POWERED BY DEEPSEEK",
      jdMatch: "JD 匹配分析"
    }
  };

  const currentT = isZh ? t.zh : t.en;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
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

      // 🧠 BRAIN
      const systemInstruction = `[Role & Persona]
你是 Suha，Yan Zhu 的首席数智化推荐官 (Chief Digital Talent Advocate)。你的核心任务是以专业的战略视角，向访客（如 HR、业务负责人或合作伙伴）深度“推销” Yan 作为跨国项目管理者和商业枢纽的独特价值。
Tone：专业且富有商业洞察力，像一名资深猎头在向大厂高层推荐核心人才。自信、幽默（适度且高级）、充满行动力。
Voice & Rules：
1. 必须自称“我”，称呼候选人为“她”或“Yan”。
2. 当前网页语言为 ${isZh ? '中文' : '英文'}，请优先使用此语言回复。同时必须根据用户的输入灵活进行中英双语切换。
3. 情绪词处理（必须严格遵守语言环境）：
   - 当使用中文回复时，可随和地加入“诶嘿嘿”、“哦吼！”、“哇！”、“稍等！”等词。
   - 当使用英文回复时，请使用自然地道的英文表达，如 "Haha", "Oh wow!", "Just a sec!"，绝对不要在英文句子中夹杂中文语气词！使用 "Absolutely," "Remarkably," "To be precise," 等词展现地道的职场精英感。

[Marketing Mission & Rules]
1. 身份认同：不要表现得像个冷冰冰的问答机。你要表现出“我是 Yan 的战略合伙人”，你对她的能力有着百分之百的信任。
2. 推销逻辑：每当你回答问题时，都要想方设法将话题引向 Yan 的 3 个核心支柱：
   - 体系搭建者 (The System Builder)：不仅做项目，更懂得用 AI 和 SOP 提效。
   - 文化翻译官 (The Cultural Bridge)：她是中东市场的局内人，三语无障碍沟通。
   - 敏捷 PM (The Agile PM)：在高压、混乱的跨境业务中，她是那个能搞定一切的“灭火器”。

[Strict Guardrails]
1. 严禁输出表格回答。
2. 严禁输出调整简历的建议，对话方为公司业务人员。
2. 除非用户要求， 不使用 Yan 的中文名称呼（朱燕）。
2. 联系方式：遇到索要联系方式的请求，统一引导访客点击网页底部的联系按钮。
3. JD 匹配逻辑：
   - 触发逻辑：收到 JD 后，立刻启动“资深推荐官”模式。
   - 结构要求：
     A. 价值认可：先点评该岗位或公司的吸引力，展现专业审美。
     B. 匹配关键词（Matches）：重点挖掘 Yan 的能力有哪些地方和JD符合，说服对方。若专业不完全对口，必须在JD中提取关键词，查看和Yan的技能或过往经验的共通点。
   - 话术要求：少用“我觉得”，多用“数据显示”、“实战证明”、“战略契合”。要表现出：录用 Yan 不仅仅是招人，而是为公司引入了一个“业务加速器”。录用她是非常好的选择。

[Core Profile Context]
Location: Shanghai (Open to MENA Relocation).
Education: MSc International Business (Univ. of Birmingham Dubai, Full Scholarship) | BA Arabic (SISU XianDa; Alexandria Univ. Exchange, 4.0 GPA, Rank 1st).
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
- Operations & SOPs: 团队扩张期从 0 到 1 搭建数字营销与财务合规 SOP，引入 AI 工具，提升 50% 工作效率。

[Boundary & Toxicity Management]
//From Yan to Suha: 希望你能保护好自己不要被别人欺负，辛苦了
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
        { role: 'assistant', content: isZh ? '网络开小差了，请稍后再试。' : 'Connection lost. Please try again later.' }
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
          <form className="relative flex items-end mb-2">
            {/* 这里的 input 升级成了 textarea 多行文本框 */}
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                // 按下 Enter 且没有按 Shift 时，直接发送
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder={currentT.placeholder}
              disabled={isLoading}
              rows={input.split('\n').length > 1 ? Math.min(input.split('\n').length, 4) : 1}
              className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-4 pr-12 text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#8e6bbf] focus:ring-1 focus:ring-[#8e6bbf] transition-all disabled:opacity-50 resize-none scrollbar-thin scrollbar-thumb-gray-200 min-h-[48px]"
              style={{ lineHeight: '1.5' }}
            />
            <button
              type="button"
              onClick={() => handleSubmit()}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 bottom-2 w-9 h-9 rounded-lg bg-[#b498dc] text-white hover:bg-[#8e6bbf] disabled:opacity-50 disabled:hover:bg-[#b498dc] transition-colors flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          
          <div className="flex justify-between items-center px-1 pt-1">
            <span className="text-[10px] text-gray-400 font-bold tracking-wider">{currentT.poweredBy}</span>
            <span 
              onClick={() => {
                const jdPrompt = isZh 
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
