import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { MelloAssistant } from './MelloAssistant';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  BookOpen, 
  Star,
  Trophy,
  Clock,
  Mic,
  Volume2,
  CheckCircle,
  Sparkles
} from 'lucide-react';

interface MyLessonsProps {
  onBack: () => void;
}

type View = 'lesson-list' | 'lesson-detail';

const lessons = [
  {
    id: 'adventure-tale',
    title: 'The Great Adventure',
    description: 'A magical story about friendship and courage',
    difficulty: 'Beginner',
    duration: '5 min',
    illustration: '🏰',
    color: 'from-blue-500 to-purple-600',
    completed: true,
    content: `Once upon a time, in a land far away, there lived a young explorer named Alex. Alex had always dreamed of going on a great adventure to discover magical treasures hidden in the enchanted forest.

One sunny morning, Alex packed a backpack with snacks, a map, and a compass. The journey began at the edge of the village, where the path led into the mysterious woods filled with talking animals and glowing flowers.

As Alex walked deeper into the forest, a friendly rabbit appeared and offered to be a guide. Together, they discovered a crystal cave where beautiful gems sparkled like stars. The rabbit explained that these gems were gifts from the forest spirits for those brave enough to explore.

Alex learned that the greatest treasure wasn't the gems, but the friendship made along the way. The adventure taught Alex that being kind to others and helping those in need brings the most joy.

When Alex returned home, everyone in the village gathered to hear about the wonderful adventure. From that day on, Alex became known as the kindest and bravest explorer in the land.`,
    practiceWords: ['adventure', 'explorer', 'magical', 'friendship', 'treasure', 'courage']
  },
  {
    id: 'space-journey',
    title: 'Journey to the Stars',
    description: 'An exciting trip through space and planets',
    difficulty: 'Intermediate',
    duration: '7 min',
    illustration: '🚀',
    color: 'from-purple-500 to-pink-600',
    completed: false,
    content: `Captain Luna was the youngest astronaut ever chosen for the Mars mission. Her spacecraft, called the Stellar Wind, was equipped with the most advanced technology in the galaxy.

As Luna launched into space, she watched Earth become smaller and smaller until it looked like a beautiful blue marble floating in the darkness. The journey through space was filled with amazing sights: colorful nebulae, spinning asteroids, and distant planets.

On her way to Mars, Luna encountered a space station where friendly alien scientists were conducting research. They shared their knowledge about the universe and taught Luna about different star systems and galaxies.

When Luna finally reached Mars, she planted a flag and collected samples of the red soil. She discovered evidence of ancient rivers and realized that Mars once had water flowing on its surface.

The return journey was just as exciting. Luna brought back valuable information that helped scientists on Earth learn more about space exploration and the possibility of life on other planets.`,
    practiceWords: ['astronaut', 'spacecraft', 'galaxy', 'nebulae', 'exploration', 'planets']
  },
  {
    id: 'underwater-world',
    title: 'Secrets of the Ocean',
    description: 'Dive deep into the underwater kingdom',
    difficulty: 'Advanced',
    duration: '10 min',
    illustration: '🌊',
    color: 'from-cyan-500 to-blue-600',
    completed: false, 
    content: `Marine biologist Dr. Maya had always been fascinated by the mysteries hidden beneath the ocean waves. Armed with her advanced diving equipment and underwater camera, she embarked on an expedition to explore the deepest parts of the Pacific Ocean.

As Maya descended into the abyss, she discovered a vibrant coral reef teeming with colorful fish, sea turtles, and exotic marine life. The reef was like an underwater rainbow, with corals of every imaginable color creating a living work of art.

Deep in the ocean depths, Maya encountered a family of whales who seemed to communicate through beautiful songs that echoed through the water. She recorded their melodies, hoping to understand their complex language and social behaviors.

Her most incredible discovery was an underwater cave system filled with bioluminescent creatures that glowed like living stars. These organisms created their own light through chemical reactions, illuminating the dark ocean depths with natural beauty.

Maya's research helped protect marine ecosystems and educated people about the importance of preserving our oceans for future generations.`,
    practiceWords: ['biologist', 'expedition', 'bioluminescent', 'ecosystems', 'preservation', 'organisms']
  }
];

export function MyLessons({ onBack }: MyLessonsProps) {
  const [currentView, setCurrentView] = useState<View>('lesson-list');
  const [selectedLesson, setSelectedLesson] = useState<typeof lessons[0] | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [melloMessage, setMelloMessage] = useState(true);
  const [melloState, setMelloState] = useState<'idle' | 'talking' | 'excited' | 'encouraging' | 'thinking' | 'celebrating'>('encouraging');

  const handleLessonSelect = (lesson: typeof lessons[0]) => {
    setSelectedLesson(lesson);
    setCurrentView('lesson-detail');
    setReadingProgress(0);
  };

  const handleStartReading = () => {
    setIsReading(true);
    setMelloState('encouraging');
    setMelloMessage(false);
    // Simulate reading progress
    const interval = setInterval(() => {
      setReadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReading(false);
          setMelloState('celebrating');
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const handleListen = () => {
    setIsListening(!isListening);
    // Simulate audio playback
    if (!isListening) {
      setTimeout(() => setIsListening(false), 5000);
    }
  };

  const renderLessonList = () => (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-3 h-3 bg-yellow-400 rounded-full opacity-80 animated-star glow-yellow" />
        <div className="absolute top-32 right-20 w-2 h-2 bg-pink-400 rounded-full opacity-70 animated-star" />
        <div className="absolute bottom-40 left-32 w-4 h-4 bg-blue-400 rounded-full opacity-60 animated-star" />
        <div className="absolute bottom-20 right-40 w-3 h-3 bg-green-400 rounded-full opacity-70 animated-star" />
        <Sparkles className="absolute top-20 left-1/3 w-6 h-6 text-pink-400 opacity-70 animated-star" />
        <Sparkles className="absolute bottom-32 right-1/3 w-5 h-5 text-yellow-400 opacity-60 float-animation" />
      </div>

      <header className="bg-black/80 backdrop-blur-sm border-b border-pink-500/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-pink-400 hover:text-pink-300 hover:bg-pink-500/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              My Lessons 📚
            </h1>
            <div></div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            Practice Stories & Lessons 
            <BookOpen className="w-10 h-10 text-pink-400 animated-star" />
          </h2>
          <p className="text-xl text-pink-200">
            Read amazing stories and improve your speaking skills! ✨
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessons.map((lesson) => (
            <Card 
              key={lesson.id}
              className="group bg-black/80 backdrop-blur-sm border border-pink-500/30 shadow-lg hover:shadow-2xl hover:glow-pink transition-all duration-300 transform hover:-translate-y-3 hover:scale-105 cursor-pointer overflow-hidden relative"
              onClick={() => handleLessonSelect(lesson)}
            >
              {lesson.completed && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>COMPLETED</span>
                  </div>
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className={`w-20 h-20 bg-gradient-to-br ${lesson.color} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-lg glow-pink float-animation mx-auto`}>
                  <span className="text-4xl">{lesson.illustration}</span>
                </div>
                
                <CardTitle className="text-xl text-white group-hover:text-pink-300 transition-colors text-center">
                  {lesson.title}
                </CardTitle>
                <p className="text-pink-200 text-sm text-center">{lesson.description}</p>
              </CardHeader>

              <CardContent className="text-center space-y-3">
                <div className="flex justify-center space-x-4 text-sm">
                  <div className="flex items-center text-pink-300">
                    <Star className="w-4 h-4 mr-1" />
                    {lesson.difficulty}
                  </div>
                  <div className="flex items-center text-pink-300">
                    <Clock className="w-4 h-4 mr-1" />
                    {lesson.duration}
                  </div>
                </div>
                
                <Button 
                  size="sm" 
                  className={`bg-gradient-to-r ${lesson.color} hover:opacity-90 hover:scale-110 text-white border-0 rounded-full px-6 glow-pink transform transition-all duration-200`}
                >
                  {lesson.completed ? 'Read Again! 🔄' : 'Start Reading! 📖✨'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLessonDetail = () => {
    if (!selectedLesson) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-3 h-3 bg-yellow-400 rounded-full opacity-80 animated-star" />
          <div className="absolute top-32 right-20 w-2 h-2 bg-pink-400 rounded-full opacity-70 animated-star" />
          <Sparkles className="absolute top-20 left-1/3 w-6 h-6 text-pink-400 opacity-70 animated-star" />
        </div>

        <header className="bg-black/80 backdrop-blur-sm border-b border-pink-500/30 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView('lesson-list')}
                className="text-pink-400 hover:text-pink-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Lessons
              </Button>
              <h1 className="text-xl font-bold text-white">
                {selectedLesson.title}
              </h1>
              <div></div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          {/* Lesson Header */}
          <Card className="mb-8 bg-black/80 backdrop-blur-sm border border-pink-500/30 shadow-xl glow-pink">
            <CardHeader className="text-center">
              <div className={`w-24 h-24 bg-gradient-to-br ${selectedLesson.color} rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg glow-pink float-animation`}>
                <span className="text-5xl">{selectedLesson.illustration}</span>
              </div>
              <CardTitle className="text-3xl text-white mb-2">
                {selectedLesson.title}
              </CardTitle>
              <p className="text-pink-200">{selectedLesson.description}</p>
              <div className="flex justify-center space-x-6 mt-4 text-sm">
                <div className="flex items-center text-pink-300">
                  <Star className="w-4 h-4 mr-1" />
                  {selectedLesson.difficulty}
                </div>
                <div className="flex items-center text-pink-300">
                  <Clock className="w-4 h-4 mr-1" />
                  {selectedLesson.duration}
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Audio Controls */}
          <Card className="mb-8 bg-black/80 backdrop-blur-sm border border-pink-500/30 shadow-xl">
            <CardContent className="p-6 text-center space-y-4">
              <h3 className="text-xl font-bold text-white mb-4">🎧 Listen to the Story</h3>
              <Button
                size="lg"
                onClick={handleListen}
                className={`bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 text-white border-0 rounded-full px-8 shadow-lg transform hover:scale-105 transition-all duration-200 glow-pink`}
              >
                {isListening ? (
                  <>
                    <Pause className="w-6 h-6 mr-2" />
                    Playing... 🎵
                  </>
                ) : (
                  <>
                    <Volume2 className="w-6 h-6 mr-2" />
                    Listen to Story 🔊
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Story Content */}
          <Card className="mb-8 bg-black/80 backdrop-blur-sm border border-pink-500/30 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-white text-center mb-4">
                📖 Read Along Mode
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96 px-4">
                <div className="text-lg leading-relaxed text-pink-100 space-y-4">
                  {selectedLesson.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="mt-6 text-center">
                {!isReading ? (
                  <Button
                    size="lg"
                    onClick={handleStartReading}
                    className={`bg-gradient-to-r ${selectedLesson.color} hover:opacity-90 text-white border-0 rounded-full px-8 shadow-lg transform hover:scale-105 transition-all duration-200 glow-pink`}
                  >
                    <Mic className="w-6 h-6 mr-2" />
                    Start Reading Aloud! 🎤
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-2">
                      <Mic className="w-6 h-6 text-pink-400 animate-pulse" />
                      <span className="text-white">Recording your reading... 🎤</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div 
                        className={`h-3 bg-gradient-to-r ${selectedLesson.color} rounded-full transition-all duration-300 glow-pink`}
                        style={{ width: `${readingProgress}%` }}
                      />
                    </div>
                    <p className="text-pink-200">Progress: {Math.round(readingProgress)}%</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Practice Words */}
          <Card className="bg-black/80 backdrop-blur-sm border border-pink-500/30 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-white text-center">
                🎯 Practice Words
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {selectedLesson.practiceWords.map((word, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-xl p-4 text-center text-white hover:glow-pink transition-all duration-200 transform hover:scale-105"
                  >
                    <span className="font-medium">{word}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Completion */}
          {readingProgress === 100 && (
            <Card className="mt-8 bg-gradient-to-r from-green-500 to-emerald-600 border-0 text-white glow-pink">
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-4 animate-bounce">🎉</div>
                <h3 className="text-3xl font-bold mb-4">
                  Fantastic Reading! You completed the story! 🏆
                </h3>
                <p className="text-xl mb-6">
                  Your speaking skills are getting better every day! ⭐
                </p>
                <Button
                  size="lg"
                  onClick={() => setCurrentView('lesson-list')}
                  className="bg-white text-green-600 hover:bg-green-50 border-0 rounded-full px-8"
                >
                  <Trophy className="w-6 h-6 mr-2" />
                  Choose Next Story! 📚
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  };

  const getMelloMessage = () => {
    if (readingProgress === 100) {
      return "Great job reading! That was impressive! ⭐";
    }
    if (currentView === 'lesson-detail') {
      return "Start when you're ready!";
    }
    return "Let's begin your next lesson!";
  };

  return (
    <>
      {currentView === 'lesson-list' ? renderLessonList() : renderLessonDetail()}
      
      {/* Mello Assistant */}
      <MelloAssistant 
        state={melloState}
        message={getMelloMessage()}
        showMessage={melloMessage || readingProgress === 100}
        onMessageDismiss={() => setMelloMessage(false)}
      />
    </>
  );
}