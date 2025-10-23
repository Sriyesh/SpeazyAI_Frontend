import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ThemeToggle } from './ThemeToggle';
import { MelloAssistant } from './MelloAssistant';
import { 
  ArrowLeft, 
  MessageCircle, 
  GraduationCap, 
  Award,
  LogOut,
  User
} from 'lucide-react';

interface ApplicationLandingProps {
  onBack: () => void;
  onModuleSelect: (module: string) => void;
  onLogout: () => void;
}

export function ApplicationLanding({ onBack, onModuleSelect, onLogout }: ApplicationLandingProps) {
  const [showMelloMessage, setShowMelloMessage] = useState(true);
  const modules = [
    {
      id: 'chat',
      title: 'AI CHAT',
      description: 'Interactive AI coaching and conversation practice',
      icon: MessageCircle,
      gradient: 'from-[#7A3CF4] to-[#4B8BFF]',
      iconBg: '#7A3CF4'
    },
    {
      id: 'academic-samples',
      title: 'ACADEMIC CONTENT',
      description: 'School presentations and class-based learning',
      icon: GraduationCap,
      gradient: 'from-[#4B8BFF] to-[#6C5CE7]',
      iconBg: '#4B8BFF'
    },
    {
      id: 'ielts',
      title: 'IELTS',
      description: 'Reading, Writing, Listening, Speaking preparation',
      icon: Award,
      gradient: 'from-[#6C5CE7] to-[#A29BFE]',
      iconBg: '#6C5CE7'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19] relative overflow-hidden">
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-pulse"
            style={{
              background: '#7A3CF4',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.15}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="bg-[#141A2A]/95 backdrop-blur-sm border-b border-[#273043] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-[#B9C2D0] hover:text-[#7A3CF4] transition-all duration-200 hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              DASHBOARD
            </Button>
            
            <h1 className="text-lg font-bold tracking-wider text-white">
              APPLICATION
            </h1>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                className="text-[#B9C2D0] hover:text-[#7A3CF4]"
              >
                <User className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="text-[#B9C2D0] hover:text-[#7A3CF4]"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4 tracking-tight uppercase">
            Choose Your Module
          </h2>
          <div className="w-24 h-1 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#7A3CF4] to-[#4B8BFF] shadow-lg shadow-[#7A3CF4]/50" />
          <p className="text-xl tracking-wide text-[#B9C2D0]">
            SELECT A LEARNING PATH TO BEGIN
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            <Card
              key={module.id}
              onClick={() => onModuleSelect(module.id)}
              className="group cursor-pointer transition-all duration-300 hover:scale-105 overflow-hidden relative bg-[#141A2A] border-[#273043] hover:border-[#7A3CF4]/50 shadow-lg shadow-[#7A3CF4]/10"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-[#7A3CF4]/10 to-transparent" />

              <CardContent className="p-8 text-center relative">
                {/* Icon */}
                <div 
                  className="w-24 h-24 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg shadow-[#7A3CF4]/30"
                  style={{ 
                    background: `linear-gradient(135deg, ${module.iconBg} 0%, ${module.iconBg}dd 100%)`
                  }}
                >
                  <module.icon className="w-12 h-12 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3 tracking-wider transition-colors uppercase">
                  {module.title}
                </h3>

                {/* Description */}
                <p className="text-[#B9C2D0] mb-6 text-sm leading-relaxed">
                  {module.description}
                </p>

                {/* Launch Button */}
                <Button
                  className="bg-gradient-to-r from-[#7A3CF4] to-[#4B8BFF] hover:from-[#6C5CE7] hover:to-[#7A3CF4] text-white rounded-lg px-6 py-2 tracking-wider transition-all duration-200 hover:scale-105 shadow-lg shadow-[#7A3CF4]/30"
                >
                  LAUNCH MODULE
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <Card className="bg-[#141A2A]/60 backdrop-blur-sm border-[#273043]">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-white mb-4 tracking-wider uppercase">
                PROFESSIONAL LEARNING PLATFORM
              </h3>
              <p className="text-[#B9C2D0] max-w-2xl mx-auto leading-relaxed">
                Each module is designed with cutting-edge AI technology to provide personalized feedback 
                and help you achieve your speaking goals. Select a module above to begin your journey.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mello Assistant */}
      <MelloAssistant
        state="talking"
        message="Pick a module to start learning! Each one is designed to help you grow your skills. 🚀"
        showMessage={showMelloMessage}
        onMessageDismiss={() => setShowMelloMessage(false)}
        position="bottom-right"
      />
    </div>
  );
}
