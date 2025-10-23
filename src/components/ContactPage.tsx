import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { ThemeToggle } from './ThemeToggle';
import { 
  ArrowLeft, 
  Mail, 
  MessageCircle, 
  Send,
  MapPin,
  Phone,
  Clock,
  Sparkles,
  Star,
  CheckCircle
} from 'lucide-react';

interface ContactPageProps {
  onBack: () => void;
}

export function ContactPage({ onBack }: ContactPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setSubmitted(false);
    }, 3000);
  };

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
        <Mail className="absolute bottom-40 left-40 w-5 h-5 text-[#6C5CE7] animate-pulse" style={{ animationDelay: '1s' }} />
        <Star className="absolute bottom-20 right-20 w-4 h-4 text-[#A29BFE] animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Header */}
      <header className="bg-[#0B0F19]/90 backdrop-blur-sm border-b border-[#273043] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-[#B9C2D0] hover:text-[#7A3CF4]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-lg font-semibold bg-gradient-to-r from-[#7A3CF4] to-[#4B8BFF] bg-clip-text text-transparent">
              Contact Us
            </h1>
            <div className="w-24" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 uppercase tracking-wider">
            Get In Touch
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-[#7A3CF4] to-[#4B8BFF] mx-auto mb-8 rounded-full shadow-lg shadow-[#7A3CF4]/50" />
          <p className="text-xl text-[#B9C2D0] max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {[
              {
                icon: Mail,
                title: 'Email Us',
                value: 'support@speechskills.ai',
                gradient: 'from-[#7A3CF4] to-[#4B8BFF]'
              },
              {
                icon: Phone,
                title: 'Call Us',
                value: '+1 (555) 123-4567',
                gradient: 'from-[#4B8BFF] to-[#6C5CE7]'
              },
              {
                icon: MapPin,
                title: 'Visit Us',
                value: '123 AI Learning Street, Tech City',
                gradient: 'from-[#6C5CE7] to-[#A29BFE]'
              },
              {
                icon: Clock,
                title: 'Business Hours',
                value: 'Mon-Fri: 9AM - 6PM EST',
                gradient: 'from-[#A29BFE] to-[#7A3CF4]'
              }
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-[#141A2A] border-[#273043] hover:border-[#7A3CF4]/50 transition-all duration-300 hover:scale-105 shadow-lg shadow-[#7A3CF4]/10"
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-[#7A3CF4]/30`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-bold mb-2 uppercase tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-[#B9C2D0]">
                    {item.value}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-[#141A2A] border-[#273043] shadow-2xl shadow-[#7A3CF4]/20">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2 uppercase tracking-wide">
                  <MessageCircle className="w-6 h-6 text-[#7A3CF4]" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#7A3CF4] to-[#4B8BFF] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#7A3CF4]/50">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-[#B9C2D0]">
                      Thank you for contacting us. We'll get back to you soon!
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-[#7A3CF4] uppercase tracking-wider">
                          Your Name
                        </Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Doe"
                          required
                          className="bg-[#0B0F19] border-[#273043] text-white placeholder:text-[#3E2C78] focus:border-[#7A3CF4] focus:ring-[#7A3CF4]/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[#7A3CF4] uppercase tracking-wider">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john@example.com"
                          required
                          className="bg-[#0B0F19] border-[#273043] text-white placeholder:text-[#3E2C78] focus:border-[#7A3CF4] focus:ring-[#7A3CF4]/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-[#7A3CF4] uppercase tracking-wider">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="How can we help?"
                        required
                        className="bg-[#0B0F19] border-[#273043] text-white placeholder:text-[#3E2C78] focus:border-[#7A3CF4] focus:ring-[#7A3CF4]/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-[#7A3CF4] uppercase tracking-wider">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us more about your inquiry..."
                        required
                        rows={6}
                        className="bg-[#0B0F19] border-[#273043] text-white placeholder:text-[#3E2C78] focus:border-[#7A3CF4] focus:ring-[#7A3CF4]/20 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#7A3CF4] to-[#4B8BFF] hover:from-[#6C5CE7] hover:to-[#7A3CF4] text-white h-12 uppercase tracking-wider shadow-lg shadow-[#7A3CF4]/30"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
