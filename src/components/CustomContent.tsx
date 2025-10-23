import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { ThemeToggle } from './ThemeToggle';
import { 
  ArrowLeft, 
  Plus, 
  Edit, 
  Trash2, 
  Mic,
  Save,
  FileText,
  Sparkles,
  Star,
  Book,
  Play
} from 'lucide-react';

interface CustomContentProps {
  onBack: () => void;
}

type CustomLesson = {
  id: number;
  title: string;
  content: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  createdAt: Date;
};

export function CustomContent({ onBack }: CustomContentProps) {
  const [view, setView] = useState<'list' | 'create' | 'practice'>('list');
  const [customLessons, setCustomLessons] = useState<CustomLesson[]>([
    {
      id: 1,
      title: 'My Favorite Story',
      content: 'Once upon a time, there was a brave little rabbit who loved adventures. Every day, the rabbit would explore new places and make new friends.',
      difficulty: 'Easy',
      createdAt: new Date('2025-01-05')
    }
  ]);
  
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newDifficulty, setNewDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Easy');
  const [selectedLesson, setSelectedLesson] = useState<CustomLesson | null>(null);
  const [isPracticing, setIsPracticing] = useState(false);

  const handleCreateLesson = () => {
    if (!newTitle.trim() || !newContent.trim()) {
      alert('Please fill in both title and content!');
      return;
    }

    const newLesson: CustomLesson = {
      id: customLessons.length + 1,
      title: newTitle,
      content: newContent,
      difficulty: newDifficulty,
      createdAt: new Date()
    };

    setCustomLessons([...customLessons, newLesson]);
    setNewTitle('');
    setNewContent('');
    setNewDifficulty('Easy');
    setView('list');
  };

  const handleDeleteLesson = (id: number) => {
    if (confirm('Are you sure you want to delete this lesson?')) {
      setCustomLessons(customLessons.filter(lesson => lesson.id !== id));
    }
  };

  const handlePracticeLesson = (lesson: CustomLesson) => {
    setSelectedLesson(lesson);
    setView('practice');
    setIsPracticing(false);
  };

  const handleStartPractice = () => {
    setIsPracticing(true);
    // Simulate practice session
    setTimeout(() => {
      setIsPracticing(false);
      alert('Great job! 🌟 You completed your practice session!');
    }, 5000);
  };

  const renderList = () => (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white dark:text-white light:text-gray-900 mb-4 flex items-center justify-center gap-3">
          Create Your Own Content ✨
          <Sparkles className="w-10 h-10 text-pink-400 kid-pulse" />
        </h2>
        <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-600">
          Write your own stories and practice speaking them!
        </p>
      </div>

      {/* Create Button */}
      <div className="mb-8 text-center">
        <Button
          onClick={() => setView('create')}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl px-8 py-6 text-lg shadow-lg glow-pink hover:scale-105 transition-all duration-300"
        >
          <Plus className="w-6 h-6 mr-2" />
          Create New Lesson
        </Button>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customLessons.map((lesson, index) => (
          <Card
            key={lesson.id}
            className="group bg-gray-900/90 border border-pink-500/30 dark:bg-gray-900/90 dark:border-pink-500/30 light:bg-white light:border-pink-300/40 hover:shadow-xl hover:glow-pink transition-all duration-300 dashboard-card-enter"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  lesson.difficulty === 'Easy' ? 'bg-gradient-to-br from-green-400 to-emerald-500' :
                  lesson.difficulty === 'Medium' ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                  'bg-gradient-to-br from-red-400 to-pink-500'
                } group-hover:scale-110 transition-transform duration-300`}>
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteLesson(lesson.id)}
                    className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 dark:text-gray-400 dark:hover:text-red-400 light:text-gray-600 light:hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <CardTitle className="text-lg text-white dark:text-white light:text-gray-900 group-hover:text-pink-300 transition-colors">
                {lesson.title}
              </CardTitle>
              <p className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-600 mt-2 line-clamp-3">
                {lesson.content}
              </p>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  lesson.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                  lesson.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {lesson.difficulty}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-500 light:text-gray-500">
                  {lesson.createdAt.toLocaleDateString()}
                </span>
              </div>

              <Button
                onClick={() => handlePracticeLesson(lesson)}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg transition-all duration-200"
              >
                <Mic className="w-4 h-4 mr-2" />
                Practice Now
              </Button>
            </CardContent>
          </Card>
        ))}

        {/* Empty State */}
        {customLessons.length === 0 && (
          <Card className="col-span-full bg-gray-900/80 border border-gray-700 dark:bg-gray-900/80 dark:border-gray-700 light:bg-white light:border-gray-200 p-12 text-center">
            <Book className="w-16 h-16 mx-auto mb-4 text-gray-600 dark:text-gray-600 light:text-gray-400" />
            <h3 className="text-xl font-bold text-white dark:text-white light:text-gray-900 mb-2">
              No custom content yet
            </h3>
            <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 mb-6">
              Create your first lesson to get started!
            </p>
            <Button
              onClick={() => setView('create')}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create First Lesson
            </Button>
          </Card>
        )}
      </div>
    </div>
  );

  const renderCreate = () => (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card className="bg-gray-900/90 border border-pink-500/30 dark:bg-gray-900/90 dark:border-pink-500/30 light:bg-white light:border-pink-300/40 shadow-2xl glow-pink">
        <CardHeader>
          <CardTitle className="text-2xl text-white dark:text-white light:text-gray-900 flex items-center">
            <Sparkles className="w-6 h-6 mr-2 text-pink-400" />
            Create New Lesson
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label className="text-gray-300 dark:text-gray-300 light:text-gray-700">Lesson Title</Label>
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Give your lesson an exciting title..."
              className="bg-gray-800 border-gray-600 text-white focus:border-pink-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white light:bg-gray-100 light:border-gray-300 light:text-gray-900"
            />
          </div>

          {/* Difficulty */}
          <div className="space-y-2">
            <Label className="text-gray-300 dark:text-gray-300 light:text-gray-700">Difficulty Level</Label>
            <div className="grid grid-cols-3 gap-3">
              {(['Easy', 'Medium', 'Hard'] as const).map((level) => (
                <Button
                  key={level}
                  variant={newDifficulty === level ? 'default' : 'outline'}
                  onClick={() => setNewDifficulty(level)}
                  className={`${
                    newDifficulty === level
                      ? level === 'Easy' ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                        level === 'Medium' ? 'bg-gradient-to-r from-yellow-500 to-orange-600' :
                        'bg-gradient-to-r from-red-500 to-pink-600'
                      : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 light:bg-gray-100 light:border-gray-300 light:text-gray-700'
                  }`}
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label className="text-gray-300 dark:text-gray-300 light:text-gray-700">Lesson Content</Label>
            <Textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Write your story or text here. This is what you'll practice speaking..."
              rows={10}
              className="bg-gray-800 border-gray-600 text-white focus:border-pink-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white light:bg-gray-100 light:border-gray-300 light:text-gray-900"
            />
            <p className="text-xs text-gray-500 dark:text-gray-500 light:text-gray-500">
              {newContent.length} characters • {newContent.split(' ').filter(w => w).length} words
            </p>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              onClick={handleCreateLesson}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Lesson
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setView('list');
                setNewTitle('');
                setNewContent('');
                setNewDifficulty('Easy');
              }}
              className="border-gray-600 text-gray-300 hover:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 light:border-gray-300 light:text-gray-700 light:hover:bg-gray-100"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPractice = () => {
    if (!selectedLesson) return null;

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-gray-900/90 border border-pink-500/30 dark:bg-gray-900/90 dark:border-pink-500/30 light:bg-white light:border-pink-300/40 shadow-2xl glow-pink">
          <CardHeader className="text-center">
            <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
              selectedLesson.difficulty === 'Easy' ? 'bg-gradient-to-br from-green-400 to-emerald-500' :
              selectedLesson.difficulty === 'Medium' ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
              'bg-gradient-to-br from-red-400 to-pink-500'
            } shadow-lg glow-pink kid-pulse`}>
              <FileText className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl text-white dark:text-white light:text-gray-900 mb-2">
              {selectedLesson.title}
            </CardTitle>
            <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
              selectedLesson.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
              selectedLesson.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {selectedLesson.difficulty}
            </span>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Content Display */}
            <div className="bg-gray-800 dark:bg-gray-800 light:bg-gray-100 rounded-xl p-6 border border-gray-700 dark:border-gray-700 light:border-gray-200">
              <h3 className="text-lg font-bold text-white dark:text-white light:text-gray-900 mb-4">📖 Your Content</h3>
              <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedLesson.content}
              </p>
            </div>

            {/* Practice Controls */}
            <div className="text-center space-y-4">
              {!isPracticing ? (
                <Button
                  onClick={handleStartPractice}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl px-12 py-6 text-lg shadow-lg glow-pink hover:scale-105 transition-all duration-300"
                >
                  <Mic className="w-6 h-6 mr-2" />
                  Start Practice Reading
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center kid-pulse shadow-2xl glow-pink">
                    <Mic className="w-16 h-16 text-white" />
                  </div>
                  <p className="text-xl text-white dark:text-white light:text-gray-900 animate-pulse">
                    🎤 Recording... Speak clearly!
                  </p>
                  <div className="flex justify-center items-end space-x-1 h-12">
                    <div className="w-3 bg-pink-500 rounded recording-bar" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-3 bg-purple-500 rounded recording-bar" style={{ animationDelay: '100ms' }}></div>
                    <div className="w-3 bg-pink-400 rounded recording-bar" style={{ animationDelay: '200ms' }}></div>
                    <div className="w-3 bg-purple-400 rounded recording-bar" style={{ animationDelay: '300ms' }}></div>
                    <div className="w-3 bg-pink-500 rounded recording-bar" style={{ animationDelay: '400ms' }}></div>
                  </div>
                </div>
              )}
            </div>

            {/* Back Button */}
            <Button
              variant="outline"
              onClick={() => setView('list')}
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 light:border-gray-300 light:text-gray-700 light:hover:bg-gray-100"
            >
              Back to Lessons
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 dark:from-black dark:via-gray-900 dark:to-green-900 light:from-green-50 light:via-emerald-50 light:to-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <Star className="absolute top-10 left-10 w-4 h-4 text-green-400 animate-pulse" />
        <Sparkles className="absolute top-40 right-20 w-5 h-5 text-emerald-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <Star className="absolute bottom-40 left-40 w-4 h-4 text-yellow-400 animate-pulse" style={{ animationDelay: '1s' }} />
        <Sparkles className="absolute bottom-20 right-40 w-5 h-5 text-green-400 animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Header */}
      <header className="bg-black/90 backdrop-blur-sm border-b border-pink-500/30 dark:border-pink-500/30 light:border-pink-300/40 sticky top-0 z-50 dark:bg-black/90 light:bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="text-gray-400 hover:text-gray-300 hover:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800 light:text-gray-600 light:hover:text-gray-900 light:hover:bg-gray-100"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
            <h1 className="text-lg font-semibold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Custom Content 📝✨
            </h1>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="relative z-10">
        {view === 'list' && renderList()}
        {view === 'create' && renderCreate()}
        {view === 'practice' && renderPractice()}
      </div>
    </div>
  );
}
