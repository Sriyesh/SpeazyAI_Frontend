import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader } from './ui/card';
import { ThemeToggle } from './ThemeToggle';
import { MelloAssistant } from './MelloAssistant';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
  onBack: () => void;
}

export function LoginPage({ onLogin, onBack }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showMelloMessage, setShowMelloMessage] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-4 relative overflow-hidden">
      {/* AI gradient overlays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#7A3CF4] to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#4B8BFF] to-transparent rounded-full blur-3xl" />
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="absolute top-4 left-4 text-[#B9C2D0] hover:text-[#7A3CF4]"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        BACK
      </Button>

      <div className="w-full max-w-md relative z-10">
        <Card className="shadow-2xl border border-[#273043] bg-[#141A2A]/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#7A3CF4] to-[#4B8BFF] rounded-2xl flex items-center justify-center shadow-lg shadow-[#7A3CF4]/50">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 uppercase tracking-wide">
              Welcome Back
            </h1>
            <p className="text-sm text-[#B9C2D0] uppercase tracking-wider">
              Sign in to continue
            </p>
          </CardHeader>

          <CardContent className="space-y-6 px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#7A3CF4] text-sm uppercase tracking-wider">
                  Email or Username
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-[#0B0F19] border-[#273043] text-white placeholder:text-[#3E2C78] focus:border-[#7A3CF4] focus:ring-[#7A3CF4]/20 rounded-lg"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#7A3CF4] text-sm uppercase tracking-wider">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 bg-[#0B0F19] border-[#273043] text-white placeholder:text-[#3E2C78] focus:border-[#7A3CF4] focus:ring-[#7A3CF4]/20 rounded-lg pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#3E2C78] hover:text-[#7A3CF4] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => {}}
                  className="text-sm text-[#B9C2D0] hover:text-[#7A3CF4] uppercase tracking-wide transition-colors"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-[#7A3CF4] to-[#4B8BFF] hover:from-[#6C5CE7] hover:to-[#7A3CF4] text-white rounded-lg font-bold uppercase tracking-wider shadow-lg shadow-[#7A3CF4]/30 transition-all duration-200"
              >
                Sign In
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#273043]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#141A2A] text-[#3E2C78] text-xs uppercase tracking-wider">
                  New to Speech Skills AI?
                </span>
              </div>
            </div>

            {/* Create Account Button */}
            <Button
              variant="outline"
              onClick={() => {}}
              className="w-full h-12 border-2 border-[#273043] text-[#7A3CF4] hover:bg-[#0B0F19] hover:border-[#7A3CF4] rounded-lg font-medium uppercase tracking-wider transition-all duration-200"
            >
              Create Account
            </Button>
          </CardContent>
        </Card>

        <p className="text-center text-[#3E2C78] text-sm mt-6 uppercase tracking-wider">
          Secure Login • Professional Platform
        </p>
      </div>

      {/* Mello Assistant */}
      <MelloAssistant
        state="waving"
        message="Welcome back! Sign in to continue your learning journey! 👋"
        showMessage={showMelloMessage}
        onMessageDismiss={() => setShowMelloMessage(false)}
        position="bottom-right"
      />
    </div>
  );
}
