import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Volume2, 
  Star, 
  Heart, 
  CheckCircle,
  RotateCcw,
  Sparkles,
  Mic,
  MicOff,
  Award
} from 'lucide-react';

interface FamousSpeechesProps {
  onBack: () => void;
}

type View = 'selection' | 'speech-detail' | 'quiz';

const speeches = [
  {
    id: 'mlk-dream',
    title: 'I Have a Dream',
    speaker: 'Martin Luther King Jr.',
    description: 'A speech about equality and dreams',
    kidFriendlyText: `"I have a dream that one day all children will play together, no matter what they look like. I dream that everyone will be kind to each other and treat each other fairly. We should judge people by how nice they are, not by the color of their skin."`,
    icon: '🌟',
    color: 'from-blue-400 to-purple-500',
    quizWords: ['dream', 'children', 'play', 'together', 'kind', 'fairly']
  },
  {
    id: 'peace-speech',
    title: 'Words of Peace',
    speaker: 'A Great Leader',
    description: 'Learning about kindness and peace',
    kidFriendlyText: `"Peace means being kind to everyone around us. When we are peaceful, we solve problems by talking, not fighting. We can make the world better by being helpful, sharing with others, and always choosing love over anger."`,
    icon: '🕊️',
    color: 'from-green-400 to-blue-500',
    quizWords: ['peace', 'kind', 'talking', 'helpful', 'sharing', 'love']
  }
];

export function FamousSpeeches({ onBack }: FamousSpeechesProps) {
  const [currentView, setCurrentView] = useState<View>('selection');
  const [selectedSpeech, setSelectedSpeech] = useState<typeof speeches[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [quizProgress, setQuizProgress] = useState<string[]>([]);
  const [draggedWord, setDraggedWord] = useState<string | null>(null);
  
  // Recording states
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [pronunciationScore, setPronunciationScore] = useState<number | null>(null);
  const [pronunciationFeedback, setPronunciationFeedback] = useState<string>('');

  const handleSpeechSelect = (speech: typeof speeches[0]) => {
    setSelectedSpeech(speech);
    setCurrentView('speech-detail');
    // Reset recording state
    setIsRecording(false);
    setHasRecorded(false);
    setPronunciationScore(null);
    setPronunciationFeedback('');
  };

  const handlePlayAudio = () => {
    setIsPlaying(!isPlaying);
    // In a real app, this would control actual audio playback
    setTimeout(() => setIsPlaying(false), 3000);
  };

  const handleStartQuiz = () => {
    setCurrentView('quiz');
    setQuizProgress([]);
    // Reset recording state
    setIsRecording(false);
    setHasRecorded(false);
    setPronunciationScore(null);
    setPronunciationFeedback('');
  };

  const handleWordDrop = (word: string, position: number) => {
    const newProgress = [...quizProgress];
    newProgress[position] = word;
    setQuizProgress(newProgress);
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setHasRecorded(false);
    setPronunciationScore(null);
    setPronunciationFeedback('');
    
    // Simulate recording for 3 seconds
    setTimeout(() => {
      setIsRecording(false);
      setHasRecorded(true);
      
      // Simulate pronunciation analysis
      const randomScore = Math.floor(Math.random() * 30) + 70; // 70-100%
      setPronunciationScore(randomScore);
      
      if (randomScore >= 90) {
        setPronunciationFeedback('Excellent pronunciation! You spoke clearly and confidently.');
      } else if (randomScore >= 80) {
        setPronunciationFeedback('Great job! Your pronunciation is very good. Keep practicing!');
      } else if (randomScore >= 70) {
        setPronunciationFeedback('Good effort! Try to speak a bit more clearly next time.');
      } else {
        setPronunciationFeedback('Keep practicing! Focus on speaking slowly and clearly.');
      }
    }, 3000);
  };

  const handleStopRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setHasRecorded(true);
      
      // Simulate analysis
      const randomScore = Math.floor(Math.random() * 30) + 70;
      setPronunciationScore(randomScore);
      
      if (randomScore >= 90) {
        setPronunciationFeedback('Excellent pronunciation! You spoke clearly and confidently.');
      } else if (randomScore >= 80) {
        setPronunciationFeedback('Great job! Your pronunciation is very good. Keep practicing!');
      } else {
        setPronunciationFeedback('Good effort! Try to speak a bit more clearly next time.');
      }
    }
  };

  const renderSpeechSelection = () => (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <header className="bg-black/90 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="text-gray-400 hover:text-gray-300 hover:bg-gray-800"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
            <h1 className="text-lg font-semibold text-white">
              Famous Speeches
            </h1>
            <div></div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Learn from Great Speakers
          </h2>
          <p className="text-lg text-gray-400">
            Discover amazing speeches that changed the world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {speeches.map((speech) => (
            <Card 
              key={speech.id}
              className="group bg-gray-900/80 border border-gray-700 hover:border-gray-600 hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => handleSpeechSelect(speech)}
            >
              <div className="absolute top-4 right-4">
                <div className="text-3xl">{speech.icon}</div>
              </div>
              
              <CardHeader className="pb-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${speech.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                  <Volume2 className="w-8 h-8 text-white" />
                </div>
                
                <CardTitle className="text-xl text-center text-white group-hover:text-pink-300 transition-colors">
                  {speech.title}
                </CardTitle>
                <p className="text-gray-400 text-center">{speech.description}</p>
                <p className="text-sm text-gray-500 text-center">by {speech.speaker}</p>
              </CardHeader>

              <CardContent className="text-center">
                <Button 
                  size="lg" 
                  className={`bg-gradient-to-r ${speech.color} hover:opacity-90 text-white rounded-lg px-6 transition-all duration-200`}
                >
                  Listen & Learn
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSpeechDetail = () => {
    if (!selectedSpeech) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
        <header className="bg-black/90 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView('selection')}
                className="text-gray-400 hover:text-gray-300 hover:bg-gray-800"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Speeches
              </Button>
              <h1 className="text-lg font-semibold text-white">
                {selectedSpeech.title}
              </h1>
              <div></div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Speech Content */}
          <Card className="mb-8 bg-gray-900/90 border border-gray-700 shadow-xl">
            <CardHeader className="text-center">
              <div className={`w-20 h-20 bg-gradient-to-br ${selectedSpeech.color} rounded-xl flex items-center justify-center mb-6 mx-auto`}>
                <span className="text-3xl">{selectedSpeech.icon}</span>
              </div>
              <CardTitle className="text-2xl text-white mb-2">
                {selectedSpeech.title}
              </CardTitle>
              <p className="text-gray-400">by {selectedSpeech.speaker}</p>
            </CardHeader>

            <CardContent className="text-center space-y-6">
              {/* Audio Controls */}
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">🎧 Listen to the Speech</h3>
                <Button
                  size="lg"
                  onClick={handlePlayAudio}
                  className={`bg-gradient-to-r ${selectedSpeech.color} hover:opacity-90 text-white rounded-lg px-6 ${isPlaying ? 'kid-pulse' : ''} transition-all duration-200`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-5 h-5 mr-2" />
                      Playing...
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Play Speech
                    </>
                  )}
                </Button>
              </div>

              {/* Speech Text */}
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">📖 Speech for Kids</h3>
                <p className="text-base leading-relaxed text-gray-300 italic">
                  {selectedSpeech.kidFriendlyText}
                </p>
              </div>

              {/* Practice Reading Section */}
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">🎤 Practice Reading</h3>
                <p className="text-gray-400 mb-4">
                  Read the speech aloud and get feedback on your pronunciation!
                </p>
                
                <div className="flex flex-col items-center space-y-4">
                  {!isRecording && !hasRecorded && (
                    <Button
                      size="lg"
                      onClick={handleStartRecording}
                      className="bg-gradient-to-r from-red-500 to-pink-600 hover:opacity-90 text-white rounded-lg px-8 transition-all duration-200"
                    >
                      <Mic className="w-5 h-5 mr-2" />
                      Start Reading
                    </Button>
                  )}

                  {isRecording && (
                    <div className="text-center">
                      <Button
                        size="lg"
                        onClick={handleStopRecording}
                        className="bg-gradient-to-r from-red-600 to-red-700 hover:opacity-90 text-white rounded-lg px-8 transition-all duration-200 kid-pulse"
                      >
                        <MicOff className="w-5 h-5 mr-2" />
                        Stop Reading
                      </Button>
                      <div className="mt-4">
                        <div className="flex justify-center items-end space-x-1 h-12">
                          <div className="w-2 bg-red-500 rounded recording-bar" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 bg-red-400 rounded recording-bar" style={{ animationDelay: '100ms' }}></div>
                          <div className="w-2 bg-red-500 rounded recording-bar" style={{ animationDelay: '200ms' }}></div>
                          <div className="w-2 bg-red-300 rounded recording-bar" style={{ animationDelay: '300ms' }}></div>
                          <div className="w-2 bg-red-500 rounded recording-bar" style={{ animationDelay: '400ms' }}></div>
                          <div className="w-2 bg-red-400 rounded recording-bar" style={{ animationDelay: '500ms' }}></div>
                          <div className="w-2 bg-red-500 rounded recording-bar" style={{ animationDelay: '600ms' }}></div>
                        </div>
                        <p className="text-red-400 mt-2 kid-pulse">Recording... Speak clearly!</p>
                      </div>
                    </div>
                  )}

                  {hasRecorded && pronunciationScore !== null && (
                    <div className="text-center space-y-4 w-full max-w-md">
                      <div className="kid-bounce">
                        {pronunciationScore >= 90 ? (
                          <div className="text-6xl">🌟</div>
                        ) : pronunciationScore >= 80 ? (
                          <div className="text-6xl">🎉</div>
                        ) : (
                          <div className="text-6xl">👏</div>
                        )}
                      </div>
                      
                      <div className="bg-gray-700 rounded-xl p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">Pronunciation Score</span>
                          <span className="font-bold text-white">{pronunciationScore}%</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all duration-1000 ${
                              pronunciationScore >= 90 ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                              pronunciationScore >= 80 ? 'bg-gradient-to-r from-blue-400 to-cyan-500' :
                              'bg-gradient-to-r from-yellow-400 to-orange-500'
                            }`}
                            style={{ width: `${pronunciationScore}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="bg-gray-700 rounded-xl p-4">
                        <div className="flex items-start space-x-3">
                          <Award className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                          <p className="text-gray-300 text-left">{pronunciationFeedback}</p>
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => {
                          setHasRecorded(false);
                          setPronunciationScore(null);
                          setPronunciationFeedback('');
                        }}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white rounded-lg px-6"
                      >
                        Try Again
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Activity Button */}
              <Button
                size="lg"
                onClick={handleStartQuiz}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white rounded-lg px-6 transition-all duration-200"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Try Fun Activity
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderQuiz = () => {
    if (!selectedSpeech) return null;

    const sentence = "I have a _____ that all _____ will play _____ and be _____ to each other.";
    const correctAnswers = ['dream', 'children', 'together', 'kind'];
    const isComplete = quizProgress.length === correctAnswers.length && 
                      quizProgress.every((word, index) => word === correctAnswers[index]);

    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
        <header className="bg-black/90 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView('speech-detail')}
                className="text-gray-400 hover:text-gray-300 hover:bg-gray-800"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Speech
              </Button>
              <h1 className="text-lg font-semibold text-white">
                Fun Word Activity
              </h1>
              <div></div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="bg-gray-900/90 border border-gray-700 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white mb-4">
                🧩 Complete the Sentence!
              </CardTitle>
              <p className="text-gray-400">
                Drag the words below to complete the sentence
              </p>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Sentence with blanks */}
              <div className="bg-gray-800 rounded-xl p-6">
                <div className="text-lg leading-relaxed text-center text-white">
                  {sentence.split('_____').map((part, index) => (
                    <span key={index}>
                      {part}
                      {index < 4 && (
                        <span 
                          className="inline-block w-24 h-10 bg-gray-700 border-2 border-dashed border-pink-400 rounded-lg mx-2 align-middle relative hover:bg-gray-600 transition-colors"
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault();
                            if (draggedWord) {
                              handleWordDrop(draggedWord, index);
                              setDraggedWord(null);
                            }
                          }}
                        >
                          {quizProgress[index] && (
                            <span className="absolute inset-0 flex items-center justify-center text-pink-400 font-medium kid-bounce">
                              {quizProgress[index]}
                            </span>
                          )}
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {/* Word Bank */}
              <div className="text-center">
                <h3 className="text-lg font-bold text-white mb-4">🎪 Word Bank</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {selectedSpeech.quizWords.map((word, index) => (
                    <div
                      key={index}
                      draggable
                      onDragStart={() => setDraggedWord(word)}
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg font-medium cursor-grab active:cursor-grabbing hover:scale-105 transition-all duration-200"
                    >
                      {word}
                    </div>
                  ))}
                </div>
              </div>

              {/* Success Message */}
              {isComplete && (
                <div className="text-center space-y-4">
                  <div className="text-6xl kid-bounce">🎉</div>
                  <h3 className="text-2xl font-bold text-green-400">
                    Fantastic! You did it!
                  </h3>
                  <p className="text-gray-400">
                    You completed the sentence perfectly!
                  </p>
                  <Button
                    size="lg"
                    onClick={() => setQuizProgress([])}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:opacity-90 text-white rounded-lg px-6"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Try Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  switch (currentView) {
    case 'selection':
      return renderSpeechSelection();
    case 'speech-detail':
      return renderSpeechDetail();
    case 'quiz':
      return renderQuiz();
    default:
      return renderSpeechSelection();
  }
}