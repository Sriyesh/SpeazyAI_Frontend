import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader } from './ui/card';
import { ThemeToggle } from './ThemeToggle';
import { MelloAssistant } from './MelloAssistant';
import { Eye, EyeOff, Check, ArrowLeft } from 'lucide-react';

interface SignUpPageProps {
  onBack: () => void;
  onSignUp: () => void;
}

export function SignUpPage({ onBack, onSignUp }: SignUpPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showMelloMessage, setShowMelloMessage] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (!agreeTerms) {
      alert('Please accept the terms and conditions');
      return;
    }
    onSignUp();
  };

  const getPasswordStrength = () => {
    if (password.length === 0) return { strength: 0, label: '', color: '' };
    if (password.length < 6) return { strength: 1, label: 'Weak', color: '#FF4444' };
    if (password.length < 10) return { strength: 2, label: 'Good', color: '#4B8BFF' };
    return { strength: 3, label: 'Strong', color: '#7A3CF4' };
  };

  const passwordStrength = getPasswordStrength();

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
              Join Us
            </h1>
            <p className="text-sm text-[#B9C2D0] uppercase tracking-wider">
              Create your account
            </p>
          </CardHeader>

          <CardContent className="space-y-5 px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#7A3CF4] text-sm uppercase tracking-wider">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 bg-[#0B0F19] border-[#273043] text-white placeholder:text-[#3E2C78] focus:border-[#7A3CF4] focus:ring-[#7A3CF4]/20 rounded-lg"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#7A3CF4] text-sm uppercase tracking-wider">
                  Email Address
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

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#7A3CF4] text-sm uppercase tracking-wider">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
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
                
                {/* Password Strength */}
                {password && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span style={{ color: passwordStrength.color }}>
                        {passwordStrength.label}
                      </span>
                      <span className="text-[#3E2C78]">
                        {password.length}/12
                      </span>
                    </div>
                    <div className="h-1 bg-[#273043] rounded-full overflow-hidden">
                      <div 
                        className="h-full transition-all duration-300"
                        style={{ 
                          width: `${(passwordStrength.strength / 3) * 100}%`,
                          background: passwordStrength.color
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-[#7A3CF4] text-sm uppercase tracking-wider">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-12 bg-[#0B0F19] border-[#273043] text-white placeholder:text-[#3E2C78] focus:border-[#7A3CF4] focus:ring-[#7A3CF4]/20 rounded-lg pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#3E2C78] hover:text-[#7A3CF4] transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  
                  {/* Match indicator */}
                  {confirmPassword && password === confirmPassword && (
                    <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                      <Check className="w-5 h-5 text-[#7A3CF4]" />
                    </div>
                  )}
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-3 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded transition-colors accent-[#7A3CF4]"
                />
                <label htmlFor="terms" className="text-xs text-[#B9C2D0] leading-relaxed">
                  I agree to the{' '}
                  <button type="button" className="text-[#7A3CF4] underline hover:text-[#4B8BFF]">
                    Terms of Service
                  </button>
                  {' '}and{' '}
                  <button type="button" className="text-[#7A3CF4] underline hover:text-[#4B8BFF]">
                    Privacy Policy
                  </button>
                </label>
              </div>

              {/* Sign Up Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-[#7A3CF4] to-[#4B8BFF] hover:from-[#6C5CE7] hover:to-[#7A3CF4] text-white rounded-lg font-bold uppercase tracking-wider shadow-lg shadow-[#7A3CF4]/30 transition-all duration-200 mt-6"
              >
                Create Account
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#273043]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#141A2A] text-[#3E2C78] text-xs uppercase tracking-wider">
                  Already have an account?
                </span>
              </div>
            </div>

            {/* Sign In Link */}
            <Button
              variant="outline"
              onClick={onBack}
              className="w-full h-12 border-2 border-[#273043] text-[#7A3CF4] hover:bg-[#0B0F19] hover:border-[#7A3CF4] rounded-lg font-medium uppercase tracking-wider transition-all duration-200"
            >
              Sign In Instead
            </Button>
          </CardContent>
        </Card>

        <p className="text-center text-[#3E2C78] text-sm mt-6 uppercase tracking-wider">
          Join Thousands of Learners
        </p>
      </div>

      {/* Mello Assistant */}
      <MelloAssistant
        state="celebrating"
        message="Awesome! You're about to join 250K+ learners worldwide! Let's get you started! 🎉"
        showMessage={showMelloMessage}
        onMessageDismiss={() => setShowMelloMessage(false)}
        position="bottom-right"
      />
    </div>
  );
}
