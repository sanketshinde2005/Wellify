import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { FaUserMd, FaUser, FaHeartbeat, FaComments, FaTimes } from 'react-icons/fa';

function ChatBot({ apiBaseUrl = 'http://localhost:5000' }) {
  const sessionIdRef = useRef(uuidv4());
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/api/chat/history/${sessionIdRef.current}`);
        if (res.data?.history) {
          setMessages(res.data.history);
        }
      } catch (err) {
        console.error('Failed to load chat history', err);
      }
    };
    fetchHistory();
  }, [apiBaseUrl]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    // Focus the input field when chat is opened
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
      const res = await axios.post(`${apiBaseUrl}/api/chat`, {
        message: input,
        sessionId: sessionIdRef.current,
      });

      if (res.data.reply) {
        setMessages([...newMessages, { role: 'assistant', content: res.data.reply }]);
      }
    } catch (err) {
      console.error('Failed to send message', err);
    }

    setLoading(false);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      {/* FAB Button */}
      <button 
        onClick={toggleChat}
        className={`fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50 ${
          isChatOpen ? "bg-red-500 hover:bg-red-600" : "bg-teal-600 hover:bg-teal-700"
        }`}
      >
        {isChatOpen 
          ? <FaTimes className="text-white text-xl" /> 
          : <FaComments className="text-white text-xl" />}
        <span className={`absolute -top-2 -right-2 bg-teal-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center transition-opacity ${messages.length > 0 && !isChatOpen ? 'opacity-100' : 'opacity-0'}`}>
          {messages.filter(m => m.role === 'assistant').length}
        </span>
      </button>

      {/* Chat Panel */}
      <div 
        className={`fixed bottom-24 right-8 w-full max-w-xs sm:max-w-sm bg-white shadow-2xl rounded-2xl border-2 border-teal-300 transition-all duration-300 z-40 ${
          isChatOpen ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
        }`}
        style={{ maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-teal-100 rounded-t-2xl border-b-2 border-teal-300 p-3">
          <div className="flex items-center justify-center gap-2">
            <FaHeartbeat className="text-2xl text-teal-700 animate-pulse" />
            <h1 className="text-xl font-bold text-teal-800">Wellify Medical Assistant</h1>
          </div>
        </div>
        
        <div className="p-3">
          <div className="h-96 overflow-y-auto rounded-lg p-3 bg-white border border-gray-200 shadow-inner space-y-3 mb-3">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 py-6">
                <p className="text-base font-medium mb-2">How can I help with your health today?</p>
                <p className="text-xs text-gray-400">Describe your symptoms or ask a question below</p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-start gap-2 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="text-teal-600 text-lg mt-1"><FaUserMd /></div>
                )}

                <div
                  className={`px-3 py-2 rounded-2xl max-w-[80%] text-sm whitespace-pre-wrap shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-teal-600 text-white rounded-br-none'
                      : 'bg-teal-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {msg.content}
                </div>

                {msg.role === 'user' && (
                  <div className="text-gray-600 text-lg mt-1"><FaUser /></div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-start gap-2 animate-pulse text-xs text-gray-500">
                <FaUserMd className="text-teal-600 mt-1" />
                <div className="bg-teal-100 px-3 py-2 rounded-xl shadow-sm">
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
          <div className="flex flex-col border-t-2 border-teal-200 pt-3">
            <div className="text-xs font-medium text-teal-700 mb-1 px-1">Your message:</div>
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
                className="flex-1 resize-none border-2 border-teal-400 bg-white px-3 py-2 rounded-xl shadow-inner text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition max-h-28 overflow-auto text-gray-800 font-medium placeholder:text-gray-400 placeholder:font-normal placeholder:text-opacity-70"
                placeholder="Share your symptoms or ask a medical question..."
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className={`px-4 py-2 rounded-xl font-semibold shadow-md text-sm transition ${
                  input.trim() 
                    ? "bg-teal-600 hover:bg-teal-700 text-white" 
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Send
              </button>
            </div>
            <div className="text-xs text-center text-gray-500 mt-2">
              Press Enter to send
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatBot;