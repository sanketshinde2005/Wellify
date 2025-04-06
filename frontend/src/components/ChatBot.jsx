import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
  MessageSquare,
  X,
  Stethoscope,
  User,
  HeartPulse,
} from 'lucide-react';

export default function Chatbot() {
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (isChatOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isChatOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5005/api/chat', {
        message: input,
      });

      if (res.data.reply) {
        setMessages([
          ...newMessages,
          { role: 'assistant', content: res.data.reply },
        ]);
      }
    } catch (err) {
      console.error('Failed to send message', err);
    }

    setLoading(false);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleChat}
        className={`btn btn-circle btn-lg fixed bottom-8 right-8 shadow-lg z-50 transition-all duration-300 ${isChatOpen ? 'bg-error text-white' : 'bg-primary text-white'
          }`}
      >
        {isChatOpen ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
        {messages.length > 0 && !isChatOpen && (
          <div className="badge badge-secondary absolute -top-1 -right-1 text-xs">
            {messages.filter((m) => m.role === 'assistant').length}
          </div>
        )}
      </button>

      {/* Chat Panel */}
      <div
        className={`fixed bottom-24 right-8 w-full max-w-xs sm:max-w-sm bg-base-100 shadow-xl rounded-box border border-primary transition-all duration-300 z-40 ${isChatOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
          }`}
        style={{ maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="bg-primary text-primary-content rounded-t-box p-3 flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1 justify-center">
            <HeartPulse className="w-5 h-5 animate-pulse" />
            <h1 className="font-bold text-lg">Wellify Assistant</h1>
          </div>
          {messages.length > 0 && (
            <button onClick={clearChat} className="btn btn-xs btn-outline border-white text-white hover:bg-white hover:text-primary">
              Clear
            </button>
          )}
        </div>

        {/* Messages */}
        <div className="p-3">
          <div className="h-96 overflow-y-auto rounded-box p-3 bg-base-100 border border-base-300 space-y-3 mb-3" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(156, 163, 175, 0.2) rgba(255, 255, 255, 0.5)' }}>
            {messages.length === 0 && (
              <div className="text-center text-base-content/70 py-6 space-y-1">
                <p className="font-medium">How can I help with your health today?</p>
                <p className="text-xs">Describe your symptoms or ask a question below</p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-start gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
              >
                {msg.role === 'assistant' && (
                  <Stethoscope className="w-5 h-5 text-primary mt-1" />
                )}

                <div
                  className={`px-3 py-2 rounded-box text-sm whitespace-pre-wrap max-w-[80%] shadow ${msg.role === 'user'
                      ? 'bg-primary text-white rounded-br-none'
                      : 'bg-primary/10 text-base-content rounded-bl-none'
                    }`}
                >
                  {msg.content}
                </div>

                {msg.role === 'user' && (
                  <User className="w-5 h-5 text-base-content mt-1" />
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-start gap-2 animate-pulse text-xs text-base-content/70">
                <Stethoscope className="text-primary mt-1 w-5 h-5" />
                <div className="bg-primary/10 px-3 py-2 rounded-box shadow-sm">
                  Assistant is typing
                  <span className="ml-1 animate-bounce inline-block">.</span>
                  <span className="ml-0.5 animate-bounce delay-75 inline-block">.</span>
                  <span className="ml-0.5 animate-bounce delay-150 inline-block">.</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex flex-col border-t border-base-300 pt-3">
            <label className="text-xs font-medium text-base-content mb-1 px-1">
              Your message:
            </label>
            <div className="flex items-center gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                rows={2}
                placeholder="Type your health question here..."
                className="textarea textarea-bordered textarea-md w-full resize-none max-h-28"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className={`btn btn-primary btn-md transition ${input.trim() ? '' : 'btn-disabled'
                  }`}
              >
                Send
              </button>
            </div>
            <div className="text-xs text-center text-base-content/60 mt-2">
              Press Enter to send
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
