import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ThemeToggle } from './ThemeToggle';
import { MelloAssistant } from './MelloAssistant';
import { 
  BookOpen, 
  GraduationCap, 
  PenTool, 
  Mic2, 
  MessageCircle, 
  Star,
  TrendingUp,
  Award,
  LogOut
} from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
  onModuleClick: (moduleId: string) => void;
}

export function Dashboard({ onLogout, onModuleClick }: DashboardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showMelloMessage, setShowMelloMessage] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const modules = [
    {
      id: 'my-lessons',
      title: 'My Lessons',
      description: 'Continue your speaking journey',
      icon: BookOpen,
      color: 'from-[#7A3CF4] to-[#6C5CE7]',
      progress: 75,
      lessons: 12
    },
    {
      id: 'academic-samples',
      title: 'Academic Samples',
      description: 'Practice with school presentations',
      icon: GraduationCap,
      color: 'from-[#4B8BFF] to-[#7A3CF4]',
      progress: 60,
      lessons: 8
    },
    {
      id: 'custom-content',
      title: 'Custom Content',
      description: 'Create your own speaking exercises',
      icon: PenTool,
      color: 'from-[#6C5CE7] to-[#A29BFE]',
      progress: 40,
      lessons: 5
    },
    {
      id: 'famous-speeches',
      title: 'Famous Speeches',
      description: 'Learn from the greatest speakers',
      icon: Mic2,
      color: 'from-[#A29BFE] to-[#4B8BFF]',
      progress: 30,
      lessons: 15
    },
    {
      id: 'chat',
      title: 'Chat with AI Coach',
      description: 'Get personalized speaking tips',
      icon: MessageCircle,
      color: 'from-[#4B8BFF] to-[#6C5CE7]',
      progress: 0,
      lessons: 0,
      isNew: true
    }
  ];

  const stats = [
    { label: 'Speaking Time', value: '2h 45m', icon: Mic2 },
    { label: 'Lessons Completed', value: '25', icon: Award },
    { label: 'Streak Days', value: '7', icon: Star },
    { label: 'Improvement', value: '+23%', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19]">
      {/* Header */}
      <header className="bg-[#141A2A]/95 backdrop-blur-sm border-b border-[#273043] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#7A3CF4] to-[#4B8BFF] rounded-xl flex items-center justify-center shadow-lg shadow-[#7A3CF4]/30">
                <Mic2 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-semibold text-white">Speech Skills AI</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 bg-[#273043] px-3 py-1 rounded-lg border border-[#3E2C78]/30">
                <Star className="w-4 h-4 text-[#7A3CF4]" />
                <span className="text-sm text-white">7 day streak</span>
              </div>
              
              <ThemeToggle />
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onModuleClick('profile')}
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-to-br from-[#7A3CF4] to-[#4B8BFF] text-white text-xs font-bold">
                    JS
                  </AvatarFallback>
                </Avatar>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome back, John! 👋
          </h2>
          <p className="text-[#B9C2D0]">
            Ready to practice your speaking skills today?
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className="bg-[#141A2A] border-[#273043] hover:border-[#7A3CF4]/50 transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg shadow-[#7A3CF4]/10"
            >
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-[#7A3CF4] to-[#4B8BFF] rounded-lg flex items-center justify-center shadow-md shadow-[#7A3CF4]/30">
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-[#B9C2D0]">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <Card 
              key={module.id}
              className="group bg-[#141A2A] border-[#273043] hover:border-[#7A3CF4]/50 cursor-pointer transition-all duration-300 hover:scale-105 relative overflow-hidden shadow-lg shadow-[#7A3CF4]/10"
              onClick={() => onModuleClick(module.id)}
            >
              {module.isNew && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-to-r from-[#7A3CF4] to-[#4B8BFF] text-white px-2 py-1 rounded-full text-xs font-bold uppercase shadow-lg shadow-[#7A3CF4]/50">
                    NEW
                  </div>
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#7A3CF4]/30`}>
                  <module.icon className="w-8 h-8 text-white" />
                </div>
                
                <CardTitle className="text-white">{module.title}</CardTitle>
                <p className="text-sm text-[#B9C2D0]">{module.description}</p>
              </CardHeader>

              <CardContent className="pt-0">
                {module.progress > 0 ? (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#B9C2D0]">Progress</span>
                      <span className="text-white font-medium">{module.progress}%</span>
                    </div>
                    <div className="w-full bg-[#273043] rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-2 bg-gradient-to-r ${module.color} transition-all duration-300 shadow-lg shadow-[#7A3CF4]/50`}
                        style={{ width: `${module.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#3E2C78]">{module.lessons} lessons available</p>
                  </div>
                ) : (
                  <div className="text-center py-2">
                    <p className="text-sm text-[#B9C2D0] mb-3">Get started with your first lesson</p>
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-[#7A3CF4] to-[#4B8BFF] hover:from-[#6C5CE7] hover:to-[#7A3CF4] text-white rounded-lg px-4 shadow-lg shadow-[#7A3CF4]/30"
                    >
                      Start Now
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Practice CTA */}
        <Card className="mt-8 bg-gradient-to-br from-[#141A2A] to-[#273043] border-[#3E2C78]/30">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Quick Practice Session
                </h3>
                <p className="text-[#B9C2D0]">
                  Take a 5-minute speaking challenge and boost your confidence
                </p>
              </div>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#7A3CF4] to-[#4B8BFF] hover:from-[#6C5CE7] hover:to-[#7A3CF4] text-white rounded-xl px-6 shadow-lg shadow-[#7A3CF4]/40"
              >
                Start Practice
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mello Assistant */}
      <MelloAssistant
        state="celebrating"
        message="Great to see you back, John! You're on a 7-day streak! Keep it up! 🎉"
        showMessage={showMelloMessage}
        onMessageDismiss={() => setShowMelloMessage(false)}
        position="bottom-right"
      />
    </div>
  );
}
