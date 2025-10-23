import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { 
  ArrowLeft, 
  User, 
  Settings, 
  Mail, 
  Bell,
  Volume2,
  VolumeX,
  Moon,
  Sun,
  Save,
  Camera
} from 'lucide-react';

interface ProfileProps {
  onBack: () => void;
}

export function Profile({ onBack }: ProfileProps) {
  const [name, setName] = useState('John Smith');
  const [email, setEmail] = useState('john.smith@email.com');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    // Simulate saving settings
    alert('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <header className="bg-black/90 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-gray-400 hover:text-gray-300 hover:bg-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-lg font-semibold text-white">
              Profile & Settings
            </h1>
            <div></div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <Card className="lg:col-span-1 bg-gray-900/80 border border-gray-700">
            <CardHeader className="text-center">
              <div className="relative mx-auto mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                  JS
                </div>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 border-2 border-gray-900"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <CardTitle className="text-white">{name}</CardTitle>
              <p className="text-gray-400 text-sm">{email}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Lessons Completed</span>
                  <span className="text-white font-medium">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Speaking Accuracy</span>
                  <span className="text-green-400 font-medium">87%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Current Streak</span>
                  <span className="text-yellow-400 font-medium">7 days</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Settings Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="bg-gray-900/80 border border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <User className="w-5 h-5 mr-2 text-pink-400" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Full Name</Label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-gray-800 border-gray-600 text-white focus:border-pink-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">Email Address</Label>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-800 border-gray-600 text-white focus:border-pink-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* App Settings */}
            <Card className="bg-gray-900/80 border border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Settings className="w-5 h-5 mr-2 text-pink-400" />
                  App Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {soundEnabled ? (
                      <Volume2 className="w-5 h-5 text-gray-400" />
                    ) : (
                      <VolumeX className="w-5 h-5 text-gray-400" />
                    )}
                    <div>
                      <p className="text-white font-medium">Sound Effects</p>
                      <p className="text-gray-400 text-sm">Enable audio feedback and sounds</p>
                    </div>
                  </div>
                  <Switch
                    checked={soundEnabled}
                    onCheckedChange={setSoundEnabled}
                  />
                </div>

                <Separator className="bg-gray-700" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-gradient-to-r from-pink-400 to-purple-400 rounded" />
                    <div>
                      <p className="text-white font-medium">Animations</p>
                      <p className="text-gray-400 text-sm">Enable visual animations in modules</p>
                    </div>
                  </div>
                  <Switch
                    checked={animationsEnabled}
                    onCheckedChange={setAnimationsEnabled}
                  />
                </div>

                <Separator className="bg-gray-700" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {darkMode ? (
                      <Moon className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Sun className="w-5 h-5 text-gray-400" />
                    )}
                    <div>
                      <p className="text-white font-medium">Theme</p>
                      <p className="text-gray-400 text-sm">Dark mode interface</p>
                    </div>
                  </div>
                  <Switch
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>

                <Separator className="bg-gray-700" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-white font-medium">Notifications</p>
                      <p className="text-gray-400 text-sm">Daily practice reminders</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="bg-gray-900/80 border border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Mail className="w-5 h-5 mr-2 text-pink-400" />
                  Contact Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400">
                  Need help or have feedback? We'd love to hear from you.
                </p>
                <div className="flex space-x-3">
                  <Button className="bg-pink-600 hover:bg-pink-700 text-white">
                    Send Feedback
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                    Get Support
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <Button
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-medium"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}