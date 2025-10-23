import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ThemeToggle } from './ThemeToggle';
import { 
  ArrowLeft, 
  Target, 
  Heart, 
  Sparkles, 
  Star,
  Users,
  Award,
  Zap
} from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
}

export function AboutPage({ onBack }: AboutPageProps) {
  const features = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To empower children worldwide with confident speaking skills through AI-powered learning',
      color: 'from-[#4B8BFF] to-[#6C5CE7]'
    },
    {
      icon: Heart,
      title: 'Kid-Friendly',
      description: 'Designed with children in mind - safe, engaging, and encouragingly fun!',
      color: 'from-[#7A3CF4] to-[#A29BFE]'
    },
    {
      icon: Award,
      title: 'Expert-Crafted',
      description: 'Lessons developed by speech experts and education professionals',
      color: 'from-[#6C5CE7] to-[#7A3CF4]'
    },
    {
      icon: Zap,
      title: 'AI-Powered',
      description: 'Advanced pronunciation analysis and personalized feedback',
      color: 'from-[#4B8BFF] to-[#A29BFE]'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Join thousands of children improving their speaking skills daily',
      color: 'from-[#7A3CF4] to-[#4B8BFF]'
    },
    {
      icon: Sparkles,
      title: 'Fun Learning',
      description: 'Interactive stories, games, and activities that make learning enjoyable',
      color: 'from-[#A29BFE] to-[#6C5CE7]'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F19] via-[#141A2A] to-[#0B0F19] relative overflow-hidden">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <Star className="absolute top-20 left-20 w-4 h-4 text-[#4B8BFF] animate-pulse" />
        <Sparkles className="absolute top-40 right-32 w-5 h-5 text-[#7A3CF4] animate-pulse" style={{ animationDelay: '0.5s' }} />
        <Heart className="absolute bottom-40 left-40 w-4 h-4 text-[#A29BFE] animate-pulse" style={{ animationDelay: '1s' }} />
        <Star className="absolute bottom-20 right-20 w-5 h-5 text-[#6C5CE7] animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Header */}
      <header className="bg-[#0B0F19]/90 backdrop-blur-sm border-b border-[#273043] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-[#B9C2D0] hover:text-[#7A3CF4] uppercase tracking-wider"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-xl font-bold text-white uppercase tracking-wider">
              About Us
            </h1>
            <div className="w-20" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 uppercase tracking-wider">
            Speech Skills AI
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-[#7A3CF4] to-[#4B8BFF] mx-auto mb-8 rounded-full shadow-lg shadow-[#7A3CF4]/50" />
          <p className="text-xl text-[#B9C2D0] max-w-3xl mx-auto leading-relaxed">
            Building confident communicators through innovative AI technology and expert-designed learning experiences
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group bg-[#141A2A] border-[#273043] hover:border-[#7A3CF4]/50 transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg shadow-[#7A3CF4]/10"
            >
              <CardContent className="p-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#7A3CF4]/30`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-[#B9C2D0] leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Story Section */}
        <Card className="bg-gradient-to-br from-[#141A2A] to-[#273043] border-[#3E2C78]/30 shadow-xl shadow-[#7A3CF4]/10">
          <CardContent className="p-8 md:p-12">
            <h3 className="text-3xl font-bold text-white mb-6 uppercase tracking-wider text-center">
              Our Story
            </h3>
            <div className="space-y-4 text-[#B9C2D0] text-lg leading-relaxed max-w-4xl mx-auto">
              <p>
                Speech Skills AI was born from a simple observation: many children struggle with public speaking and verbal communication, but traditional methods don't always engage them effectively.
              </p>
              <p>
                We combined cutting-edge artificial intelligence with proven speech training techniques to create a platform that makes learning fun, interactive, and personalized. Every lesson is designed to build confidence while developing essential communication skills.
              </p>
              <p>
                Today, thousands of children around the world use Speech Skills AI to improve their speaking abilities, overcome stage fright, and express themselves with confidence.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            { number: '10,000+', label: 'Active Students' },
            { number: '50,000+', label: 'Lessons Completed' },
            { number: '95%', label: 'Satisfaction Rate' }
          ].map((stat, index) => (
            <Card
              key={index}
              className="bg-[#141A2A] border-[#273043] text-center p-8 hover:border-[#7A3CF4]/50 transition-all duration-300 shadow-lg shadow-[#7A3CF4]/10"
            >
              <p className="text-5xl font-bold bg-gradient-to-r from-[#7A3CF4] to-[#4B8BFF] bg-clip-text text-transparent mb-2">
                {stat.number}
              </p>
              <p className="text-[#B9C2D0] uppercase tracking-wider">
                {stat.label}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
