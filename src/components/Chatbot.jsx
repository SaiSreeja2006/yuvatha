import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, Bot, Sparkles } from 'lucide-react';
import clsx from 'clsx';

const KNOWLEDGE_BASE = [
  {
    keywords: ["hello", "hi", "hey", "greetings"],
    response: "Hello! I'm your YUVATA Safety Assistant. I'm here to help you navigate the digital world safely. What's on your mind today?"
  },
  {
    keywords: ["phishing", "email", "link", "smishing"],
    response: "Phishing is when scammers pretend to be a trusted source (like your bank) to steal passwords. Rule of thumb: Never click links in unexpected emails. Always go to the official website manually!"
  },
  {
    keywords: ["password", "secure", "login", "2fa", "authentication"],
    response: "For top-tier security, use a 'passphrase' (4-5 random words), enable Two-Factor Authentication (2FA), and never reuse the same password across different sites."
  },
  {
    keywords: ["scam", "fraud", "fake", "money", "telegram", "whatsapp"],
    response: "Scams often promise 'Easy Money' or use 'Fear' (like Digital Arrest). If an offer sounds too good to be true, or someone is threatening you with legal action over the phone, it's 100% a scam."
  },
  {
    keywords: ["deepfake", "ai", "video", "generated", "image"],
    response: "Deepfakes are AI-generated media that look real but are fake. Check for unnatural blinking, mismatched lighting, or glitchy edges around the face to spot them."
  },
  {
    keywords: ["profile", "score", "literacy", "rank"],
    response: "Your Literacy Score reflects your progress in our modules. Complete more challenges and quizzes to increase your rank and unlock advanced safety modules!"
  },
  {
    keywords: ["footprint", "privacy", "data", "track", "cookies"],
    response: "Your digital footprint is the trail of data you leave online. To reduce it, use privacy-focused browsers, clear your cookies regularly, and be selective about what you share on social media."
  },
  {
    keywords: ["help", "what", "can", "do"],
    response: "I can explain security concepts (Phishing, 2FA, Deepfakes), give advice on securing your accounts, or guide you through the YUVATA platform. Just ask about any safety topic!"
  },
  {
    keywords: ["who", "created", "yuvata", "dev"],
    response: "YUVATA was created as a Digital Literacy Awareness Platform to empower users with the knowledge to fight back against cyber-criminals."
  },
  {
    keywords: ["thank", "thanks", "cool", "great"],
    response: "You're very welcome! Stay safe and keep learning. Is there anything else you'd like to know?"
  }
];

const FALLBACK_RESPONSES = [
  "That's an interesting question! While I'm specialized in digital safety, I'd recommend checking our 'Scam Awareness Hub' for similar topics, or asking me specifically about things like passwords or phishing.",
  "I'm still learning! Could you try rephrasing that? You can ask me about security, scams, or how to improve your literacy score.",
  "I specialize in digital awareness. If you have questions about staying safe online, I'm your assistant! What safety topic are you curious about?"
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Welcome! I'm your Digital Awareness Assistant. Ask me anything about staying safe online." }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI "Thinking" and "Typing"
    setTimeout(() => {
      const lowerInput = inputValue.toLowerCase();
      let response = null;

      // Find best match in knowledge base
      for (const item of KNOWLEDGE_BASE) {
        if (item.keywords.some(k => lowerInput.includes(k))) {
          response = item.response;
          break;
        }
      }

      // If no match, use random fallback
      if (!response) {
        response = FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
      }

      setMessages(prev => [...prev, { role: 'bot', text: response }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 h-[450px] bg-white rounded-2xl shadow-2xl border border-[#E5D5C5] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-primary p-4 text-white flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot size={18} />
              </div>
              <div>
                <h3 className="font-bold text-sm">YUVATA Assistant</h3>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-[10px] opacity-80">Online & Ready</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-md transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={clsx(
                  "flex items-end gap-2 max-w-[85%]",
                  msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                <div className={clsx(
                  "w-6 h-6 rounded-full flex items-center justify-center shrink-0 mb-1 shadow-sm",
                  msg.role === 'bot' ? "bg-secondary text-primary" : "bg-primary text-white"
                )}>
                  {msg.role === 'bot' ? <Sparkles size={12} /> : <User size={12} />}
                </div>
                <div className={clsx(
                  "p-3 rounded-2xl text-sm shadow-sm leading-relaxed",
                  msg.role === 'bot' 
                    ? "bg-white border border-[#E5D5C5] rounded-bl-none text-accent" 
                    : "bg-primary text-white rounded-br-none"
                )}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-end gap-2 mr-auto max-w-[85%] animate-pulse">
                <div className="w-6 h-6 rounded-full bg-secondary text-primary flex items-center justify-center shrink-0 mb-1 shadow-sm">
                  <Bot size={12} />
                </div>
                <div className="p-3 rounded-2xl rounded-bl-none bg-white border border-[#E5D5C5] text-accent/40 text-[10px] font-bold uppercase tracking-widest italic flex gap-1 items-center">
                  AI is thinking
                  <span className="flex gap-0.5 mt-0.5">
                    <span className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1 h-1 bg-primary rounded-full animate-bounce"></span>
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-[#E5D5C5]">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about digital safety..."
                className="flex-1 bg-gray-50 border border-[#E5D5C5] rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:bg-gray-400 disabled:shadow-none"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110",
          isOpen ? "bg-white text-primary border border-primary rotate-90" : "bg-primary text-white"
        )}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
}
