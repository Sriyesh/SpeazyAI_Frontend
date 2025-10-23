import { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { ThemeToggle } from './ThemeToggle';
import { MelloAssistant } from './MelloAssistant';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Send, 
  Mic, 
  Bot,
  User,
  Sparkles,
  Heart,
  Star,
  ThumbsUp,
  Lightbulb
} from 'lucide-react';

interface ChatWithAIProps {
  onBack: () => void;
}

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

export function ChatWithAI({ onBack }: ChatWithAIProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! 👋 I'm your friendly AI Speaking Coach! I'm here to help you become an amazing speaker! What would you like to practice today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    { icon: '🎤', text: 'How can I speak more clearly?' },
    { icon: '📖', text: 'Can you give me a practice story?' },
    { icon: '💪', text: 'Tips for confident speaking' },
    { icon: '🎯', text: 'Help with pronunciation' }
  ];

  const aiResponses = {
    'clear': "Great question! 🌟 To speak more clearly, try these tips:\n\n1. 🗣️ Speak slowly and take your time\n2. 💨 Take deep breaths before speaking\n3. 👄 Open your mouth wider when you talk\n4. 📚 Practice reading out loud every day\n\nWould you like to try a practice exercise?",
    'story': "I'd love to share a story! 📖✨\n\nOnce there was a little star named Sparkle who wanted to shine the brightest. Every night, Sparkle practiced twinkling until she became the most beautiful star in the sky! 🌟\n\nThe lesson? Practice makes perfect! Would you like to read this story aloud?",
    'confident': "You've got this! 💪✨ Here are my top tips for confident speaking:\n\n1. 🦸 Stand tall and smile\n2. 👀 Look at your audience\n3. 🎵 Use your natural voice\n4. ❤️ Be yourself - you're amazing!\n5. 🌟 Remember: Everyone makes mistakes, and that's okay!\n\nWhat would you like to practice?",
    'pronunciation': "Pronunciation is so important! 🎯 Let's work on it together:\n\n1. 👂 Listen carefully to words\n2. 🔄 Break big words into small parts\n3. 🎬 Practice saying them slowly\n4. 🎤 Record yourself and listen back\n\nWant to try pronouncing some fun words?",
    'default': "That's a wonderful question! 🌈 I'm here to help you with:\n\n✨ Speaking clearly\n📚 Reading practice\n🎤 Pronunciation\n💪 Building confidence\n🎯 Presentation skills\n\nWhat would you like to explore?"
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const input = inputMessage.toLowerCase();
      let response = aiResponses.default;

      if (input.includes('clear') || input.includes('clarity')) {
        response = aiResponses.clear;
      } else if (input.includes('story') || input.includes('read')) {
        response = aiResponses.story;
      } else if (input.includes('confident') || input.includes('confidence')) {
        response = aiResponses.confident;
      } else if (input.includes('pronunciation') || input.includes('pronounce')) {
        response = aiResponses.pronunciation;
      }

      const aiMessage: Message = {
        id: messages.length + 2,
        text: response,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ background: '#0D0D0E' }}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <Star className="absolute top-10 left-10 w-4 h-4 animate-pulse" style={{ color: '#AA9ADB3' }} />
        <Heart className="absolute top-40 right-20 w-5 h-5 animate-pulse" style={{ color: '#AA9ADB3', animationDelay: '0.5s' }} />
        <Sparkles className="absolute bottom-40 left-40 w-4 h-4 animate-pulse" style={{ color: '#AA9ADB3', animationDelay: '1s' }} />
        <Star className="absolute bottom-20 right-40 w-5 h-5 animate-pulse" style={{ color: '#8B7AD1', animationDelay: '1.5s' }} />
      </div>

      {/* Header */}
      <header 
        className="backdrop-blur-sm border-b sticky top-0 z-50"
        style={{ 
          background: 'rgba(13, 13, 14, 0.95)',
          borderColor: 'rgba(170, 154, 219, 0.25)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="transition-all duration-200 hover:scale-105"
                style={{ color: '#AA9ADB3' }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
            <h1 
              className="text-lg font-semibold"
              style={{ color: '#FFFFFF' }}
            >
              Chat with AI Coach 🤖✨
            </h1>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Main Chat Card */}
        <Card 
          className="h-[calc(100vh-200px)] flex flex-col shadow-2xl"
          style={{ 
            background: '#4F545A',
            border: '1px solid rgba(170, 154, 219, 0.25)',
            borderRadius: '24px',
            boxShadow: '0 0 40px rgba(170, 154, 219, 0.2)'
          }}
        >
          {/* Chat Header */}
          <CardHeader 
            className="pb-4"
            style={{ borderBottom: '1px solid rgba(170, 154, 219, 0.15)' }}
          >
            <div className="flex items-center space-x-4">
              <motion.div 
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                style={{ 
                  background: 'linear-gradient(135deg, #AA9ADB3 0%, #8B7AD1 100%)',
                  boxShadow: '0 0 20px rgba(170, 154, 219, 0.5)'
                }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Bot className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h2 className="text-xl font-bold" style={{ color: '#FFFFFF' }}>AI Speaking Coach</h2>
                <p className="text-sm" style={{ color: '#AA9ADB3' }}>Always here to help! 🌟</p>
              </div>
            </div>
          </CardHeader>

          {/* Messages Area */}
          <CardContent className="flex-1 overflow-hidden p-0">
            <ScrollArea className="h-full px-6 py-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`flex items-start space-x-2 max-w-[80%] ${
                        message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
                      }`}
                    >
                      {/* Avatar */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0`}
                        style={{
                          background: message.sender === 'ai'
                            ? 'linear-gradient(135deg, #AA9ADB3 0%, #8B7AD1 100%)'
                            : '#234428'
                        }}
                      >
                        {message.sender === 'ai' ? (
                          <Bot className="w-4 h-4 text-white" />
                        ) : (
                          <User className="w-4 h-4 text-white" />
                        )}
                      </div>

                      {/* Message Bubble */}
                      <div
                        className="rounded-2xl px-4 py-3"
                        style={{
                          background: message.sender === 'ai' ? '#234428' : '#4F545A',
                          border: '1px solid rgba(170, 154, 219, 0.15)',
                          color: '#FFFFFF'
                        }}
                      >
                        <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #AA9ADB3 0%, #8B7AD1 100%)' }}
                      >
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div 
                        className="rounded-2xl px-4 py-3"
                        style={{ 
                          background: '#234428',
                          border: '1px solid rgba(170, 154, 219, 0.15)'
                        }}
                      >
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#AA9ADB3' }} />
                          <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#AA9ADB3', animationDelay: '0.2s' }} />
                          <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#AA9ADB3', animationDelay: '0.4s' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div 
              className="px-6 py-3"
              style={{ borderTop: '1px solid rgba(170, 154, 219, 0.15)' }}
            >
              <p className="text-xs mb-2" style={{ color: '#888888' }}>💡 Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((q, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickQuestion(q.text)}
                    className="text-xs transition-all duration-200 hover:scale-105"
                    style={{
                      background: '#234428',
                      border: '1px solid rgba(170, 154, 219, 0.25)',
                      color: '#AA9ADB3'
                    }}
                  >
                    <span className="mr-1">{q.icon}</span>
                    {q.text}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div 
            className="p-4"
            style={{ borderTop: '1px solid rgba(170, 154, 219, 0.15)' }}
          >
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                style={{ color: '#AA9ADB3' }}
              >
                <Mic className="w-5 h-5" />
              </Button>
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message here... 💬"
                className="flex-1 rounded-xl"
                style={{
                  background: 'rgba(35, 68, 40, 0.5)',
                  border: '1px solid rgba(170, 154, 219, 0.25)',
                  color: '#FFFFFF'
                }}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="rounded-xl transition-all duration-200 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #AA9ADB3 0%, #8B7AD1 100%)',
                  color: '#0D0D0E'
                }}
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Helper Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {[
            { icon: Lightbulb, title: 'Get Tips', desc: 'Ask for speaking advice', color: '#AA9ADB3' },
            { icon: Star, title: 'Practice', desc: 'Request practice exercises', color: '#8B7AD1' },
            { icon: ThumbsUp, title: 'Feedback', desc: 'Get instant responses', color: '#AA9ADB3' }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card 
                className="p-4 text-center transition-all duration-300 hover:scale-105 cursor-pointer"
                style={{ 
                  background: '#4F545A',
                  border: '1px solid rgba(170, 154, 219, 0.15)',
                  borderRadius: '16px'
                }}
              >
                <item.icon className="w-8 h-8 mx-auto mb-2" style={{ color: item.color }} />
                <h3 className="font-bold mb-1" style={{ color: '#FFFFFF' }}>{item.title}</h3>
                <p className="text-xs" style={{ color: '#888888' }}>{item.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mello Assistant - quiet during chat */}
      <MelloAssistant 
        state="idle"
        message=""
        showMessage={false}
      />
    </div>
  );
}
