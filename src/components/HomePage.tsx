import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ThemeToggle } from './ThemeToggle';
import { MelloAssistant } from './MelloAssistant';
import { 
  Mic2, 
  Info, 
  Mail, 
  LogIn, 
  UserPlus, 
  LayoutDashboard,
  Star,
  Users,
  Download,
  TrendingUp,
  Globe,
  Award,
  Sparkles,
  Target,
  Heart,
  Zap,
  Shield,
  Quote
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (view: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [showMelloMessage, setShowMelloMessage] = useState(true);
  const [melloState, setMelloState] = useState<'idle' | 'talking' | 'waving' | 'celebrating' | 'thinking'>('waving');

  const features = [
    {
      icon: Target,
      title: 'AI-Powered Learning',
      description: 'Advanced speech recognition technology provides instant feedback on pronunciation, pace, and clarity',
      gradient: 'from-[#7A3CF4] to-[#6C5CE7]'
    },
    {
      icon: Users,
      title: 'Expert-Designed Curriculum',
      description: 'Lessons crafted by professional speech coaches and educators to ensure effective learning outcomes',
      gradient: 'from-[#4B8BFF] to-[#7A3CF4]'
    },
    {
      icon: Zap,
      title: 'Interactive Practice',
      description: 'Engaging exercises, real-world scenarios, and gamified learning to keep students motivated',
      gradient: 'from-[#6C5CE7] to-[#A29BFE]'
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Child-safe environment with privacy protection and parental controls built-in',
      gradient: 'from-[#A29BFE] to-[#4B8BFF]'
    }
  ];

  const stats = [
    { 
      icon: Download, 
      value: '500K+', 
      label: 'Total Downloads',
      color: '#7A3CF4'
    },
    { 
      icon: Users, 
      value: '250K+', 
      label: 'Active Students',
      color: '#4B8BFF'
    },
    { 
      icon: Globe, 
      value: '150+', 
      label: 'Countries',
      color: '#6C5CE7'
    },
    { 
      icon: Award, 
      value: '1M+', 
      label: 'Lessons Completed',
      color: '#A29BFE'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Parent',
      avatar: 'SJ',
      rating: 5,
      text: 'My daughter has gained so much confidence in public speaking! The AI feedback is incredibly helpful and she actually looks forward to practice sessions.',
      gradient: 'from-[#7A3CF4] to-[#4B8BFF]'
    },
    {
      name: 'Michael Chen',
      role: 'Teacher',
      avatar: 'MC',
      rating: 5,
      text: 'I recommend Speech Skills AI to all my students. The structured lessons and instant feedback have significantly improved their presentation skills.',
      gradient: 'from-[#4B8BFF] to-[#6C5CE7]'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Parent',
      avatar: 'ER',
      rating: 5,
      text: 'As a non-native English speaker, this app has been invaluable for my son. His pronunciation and fluency have improved dramatically in just 3 months!',
      gradient: 'from-[#6C5CE7] to-[#A29BFE]'
    },
    {
      name: 'David Thompson',
      role: 'Speech Coach',
      avatar: 'DT',
      rating: 5,
      text: 'The curriculum is expertly designed and the AI technology is impressive. It complements traditional speech training perfectly.',
      gradient: 'from-[#A29BFE] to-[#7A3CF4]'
    }
  ];

  const achievements = [
    { 
      icon: Award, 
      title: 'Award-Winning Platform',
      description: 'EdTech Innovation Award 2024'
    },
    { 
      icon: Star, 
      title: '4.9/5 Rating',
      description: 'Over 50,000 reviews'
    },
    { 
      icon: Heart, 
      title: '95% Satisfaction',
      description: 'Parent & student approval'
    },
    { 
      icon: TrendingUp, 
      title: 'Proven Results',
      description: '87% improvement rate'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19] relative overflow-x-hidden">
      {/* AI-themed gradient overlays */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#7A3CF4] to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-[#4B8BFF] to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#3E2C78] to-transparent rounded-full blur-3xl opacity-30" />
      </div>

      {/* Subtle diagonal pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 100px, rgba(122, 60, 244, 0.1) 100px, rgba(122, 60, 244, 0.1) 200px)'
        }} />
      </div>

      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-40 border-b border-[#273043] bg-[#0B0F19]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#7A3CF4] to-[#4B8BFF] rounded-lg flex items-center justify-center shadow-lg shadow-[#7A3CF4]/30">
                <Mic2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold uppercase tracking-wider text-lg">
                Speech Skills AI
              </span>
            </div>

            {/* Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => onNavigate('about')}
                className="text-[#B9C2D0] hover:text-[#7A3CF4] uppercase text-sm tracking-wider transition-colors duration-200"
              >
                About
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="text-[#B9C2D0] hover:text-[#7A3CF4] uppercase text-sm tracking-wider transition-colors duration-200"
              >
                Contact
              </button>
              <Button
                onClick={() => onNavigate('login')}
                className="bg-gradient-to-r from-[#7A3CF4] to-[#4B8BFF] hover:from-[#6C5CE7] hover:to-[#7A3CF4] text-white rounded-lg px-6 uppercase text-sm tracking-wider shadow-lg shadow-[#7A3CF4]/30 transition-all duration-200"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] px-4 py-12">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 uppercase tracking-wider">
            Speech Skills AI
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-[#7A3CF4] to-[#4B8BFF] mx-auto mb-8 rounded-full shadow-lg shadow-[#7A3CF4]/50" />
          <p className="text-2xl text-[#B9C2D0] mb-12 uppercase tracking-wide">
            Professional Speech Training Platform
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <Button
              onClick={() => onNavigate('signup')}
              className="h-14 px-12 bg-gradient-to-r from-[#7A3CF4] to-[#4B8BFF] hover:from-[#6C5CE7] hover:to-[#7A3CF4] text-white rounded-lg uppercase text-sm tracking-wider shadow-2xl shadow-[#7A3CF4]/40 transition-all duration-300 hover:scale-105"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Sign Up Free
            </Button>
            <Button
              onClick={() => onNavigate('login')}
              variant="outline"
              className="h-14 px-12 border-2 border-[#273043] text-[#7A3CF4] hover:bg-[#141A2A] hover:border-[#7A3CF4] rounded-lg uppercase text-sm tracking-wider transition-all duration-300 hover:scale-105"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Sign In
            </Button>
          </div>

          {/* Quick Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Info,
                title: 'ABOUT US',
                description: 'Learn about our mission',
                action: 'about',
                gradient: 'from-[#6C5CE7] to-[#A29BFE]'
              },
              {
                icon: LayoutDashboard,
                title: 'DASHBOARD',
                description: 'Access your learning portal',
                action: 'login',
                gradient: 'from-[#7A3CF4] to-[#4B8BFF]'
              },
              {
                icon: Mail,
                title: 'CONTACT',
                description: 'Get in touch with us',
                action: 'contact',
                gradient: 'from-[#4B8BFF] to-[#6C5CE7]'
              }
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => onNavigate(item.action)}
                className="group bg-[#141A2A]/80 backdrop-blur-sm border border-[#273043] rounded-lg p-6 hover:border-[#7A3CF4]/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#7A3CF4]/20"
              >
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center shadow-lg shadow-[#7A3CF4]/30 transition-all duration-300 group-hover:scale-110`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wider group-hover:text-[#7A3CF4] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[#B9C2D0] uppercase text-xs tracking-wide">
                  {item.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-wider">
              Trusted Worldwide
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#7A3CF4] to-[#4B8BFF] mx-auto mb-6 rounded-full shadow-lg shadow-[#7A3CF4]/50" />
            <p className="text-xl text-[#B9C2D0]">
              Join hundreds of thousands of learners achieving their goals
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="bg-[#141A2A] border-[#273043] hover:border-[#7A3CF4]/50 transition-all duration-300 hover:scale-105 shadow-lg shadow-[#7A3CF4]/10"
              >
                <CardContent className="p-8 text-center">
                  <div 
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg shadow-[#7A3CF4]/30"
                    style={{ background: `linear-gradient(135deg, ${stat.color}, ${stat.color}dd)` }}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-4xl font-bold text-white mb-2">{stat.value}</p>
                  <p className="text-sm text-[#B9C2D0] uppercase tracking-wider">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Achievements */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-[#141A2A] to-[#0B0F19] border-[#273043] hover:border-[#7A3CF4]/50 transition-all duration-300 hover:scale-105 shadow-lg shadow-[#7A3CF4]/10"
              >
                <CardContent className="p-6 text-center">
                  <achievement.icon className="w-10 h-10 text-[#7A3CF4] mx-auto mb-3" />
                  <h4 className="text-white font-bold mb-1">{achievement.title}</h4>
                  <p className="text-sm text-[#B9C2D0]">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4 bg-gradient-to-b from-transparent via-[#141A2A]/30 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-wider">
              Why Choose Us
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#7A3CF4] to-[#4B8BFF] mx-auto mb-6 rounded-full shadow-lg shadow-[#7A3CF4]/50" />
            <p className="text-xl text-[#B9C2D0]">
              Cutting-edge technology meets expert pedagogy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group bg-[#141A2A] border-[#273043] hover:border-[#7A3CF4]/50 transition-all duration-300 hover:scale-105 shadow-lg shadow-[#7A3CF4]/10"
              >
                <CardContent className="p-8">
                  <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg shadow-[#7A3CF4]/30 transition-all duration-300 group-hover:scale-110`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="text-[#B9C2D0] leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-wider">
              What People Say
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#7A3CF4] to-[#4B8BFF] mx-auto mb-6 rounded-full shadow-lg shadow-[#7A3CF4]/50" />
            <p className="text-xl text-[#B9C2D0]">
              Real stories from real users
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-[#141A2A] border-[#273043] hover:border-[#7A3CF4]/50 transition-all duration-300 hover:scale-105 shadow-lg shadow-[#7A3CF4]/10"
              >
                <CardContent className="p-8">
                  <Quote className="w-10 h-10 text-[#7A3CF4] mb-4 opacity-50" />
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#7A3CF4] fill-[#7A3CF4]" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-[#B9C2D0] mb-6 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className={`bg-gradient-to-br ${testimonial.gradient} text-white font-bold`}>
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-white font-bold">{testimonial.name}</p>
                      <p className="text-sm text-[#B9C2D0]">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-[#141A2A] to-[#273043] border-[#7A3CF4]/30 shadow-2xl shadow-[#7A3CF4]/20">
            <CardContent className="p-12 text-center">
              <Sparkles className="w-16 h-16 text-[#7A3CF4] mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-white mb-4 uppercase tracking-wider">
                Start Your Journey Today
              </h2>
              <p className="text-xl text-[#B9C2D0] mb-8">
                Join thousands of students improving their speaking skills with AI-powered coaching
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  onClick={() => onNavigate('signup')}
                  className="h-14 px-12 bg-gradient-to-r from-[#7A3CF4] to-[#4B8BFF] hover:from-[#6C5CE7] hover:to-[#7A3CF4] text-white rounded-lg uppercase text-sm tracking-wider shadow-xl shadow-[#7A3CF4]/40 transition-all duration-300 hover:scale-105"
                >
                  Get Started Free
                </Button>
                <Button
                  onClick={() => onNavigate('about')}
                  variant="outline"
                  className="h-14 px-12 border-2 border-[#7A3CF4] text-[#7A3CF4] hover:bg-[#7A3CF4] hover:text-white rounded-lg uppercase text-sm tracking-wider transition-all duration-300 hover:scale-105"
                >
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#273043] bg-[#0B0F19]/80 backdrop-blur-sm py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[#3E2C78] text-sm uppercase tracking-wider mb-2">
            © 2025 Speech Skills AI • Professional Speech Training Platform
          </p>
          <p className="text-[#3E2C78] text-xs">
            Empowering voices worldwide with AI technology
          </p>
        </div>
      </footer>

      {/* Mello Assistant */}
      <MelloAssistant
        state={melloState}
        message="Hi! I'm Mello, your AI learning companion! Ready to start your speaking journey? 🌟"
        showMessage={showMelloMessage}
        onMessageDismiss={() => setShowMelloMessage(false)}
        position="bottom-right"
      />
    </div>
  );
}
