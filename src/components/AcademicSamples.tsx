import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import {
  ArrowLeft,
  Mic,
  Square,
  Play,
  ChevronLeft,
  ChevronRight,
  Star,
  Trophy,
  Heart,
  RotateCcw,
  Volume2,
  CheckCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

interface AcademicSamplesProps {
  onBack: () => void;
}

type View = "class-selection" | "recording-session";
type PronunciationScore =
  | "excellent"
  | "good"
  | "needs-practice"
  | null;

const classes = [
  {
    id: "ukg",
    title: "UKG",
    description: "First words with animated pictures",
    ageGroup: "3-5 years",
    icon: "🎈",
    color: "from-yellow-400 to-orange-500",
    isNew: true,
    words: [
      {
        word: "Apple",
        encouragement: "Yay! Apple is red and yummy! 🍎",
        hasAnimation: false,
      },
      {
        word: "Ball",
        encouragement: "Woohoo! Ball bounces up and down! ⚽",
        hasAnimation: false,
      },
      {
        word: "Car",
        encouragement: "Vroom vroom! Cars go fast! 🚗",
        hasAnimation: false,
      },
      {
        word: "Duck",
        encouragement: "Quack quack! Ducks swim in water! 🦆",
        hasAnimation: false,
      },
      {
        word: "Fish",
        encouragement: "Splash! Fish swim in the sea! 🐠",
        hasAnimation: true,
      },
      {
        word: "Sun",
        encouragement:
          "Bright and shiny! Sun gives us light! ☀️",
        hasAnimation: true,
      },
    ],
  },
  {
    id: "class-1-2",
    title: "Class 1-2",
    description: "Fun words for little learners",
    ageGroup: "5-7 years",
    icon: "🌱",
    color: "from-green-400 to-blue-500",
    words: [
      {
        word: "Apple",
        encouragement: "Great job! Apples are yummy!",
      },
      {
        word: "Orange",
        encouragement: "Awesome! Oranges are so bright!",
      },
      {
        word: "Banana",
        encouragement: "Perfect! Bananas are sweet!",
      },
      {
        word: "Ball",
        encouragement: "Fantastic! Let's play ball!",
      },
      {
        word: "Cat",
        encouragement: "Wonderful! Cats say meow!",
      },
      {
        word: "Dog",
        encouragement: "Amazing! Dogs are friendly!",
      },
    ],
  },
  {
    id: "class-3-4",
    title: "Class 3-4",
    description: "Building vocabulary skills",
    ageGroup: "8-10 years",
    icon: "🌟",
    color: "from-purple-400 to-pink-500",
    words: [
      {
        word: "Butterfly",
        encouragement: "Excellent! Butterflies are beautiful!",
      },
      {
        word: "Rainbow",
        encouragement: "Brilliant! Rainbows have many colors!",
      },
      {
        word: "Mountain",
        encouragement: "Super! Mountains are tall!",
      },
      {
        word: "Ocean",
        encouragement: "Terrific! Oceans are deep and blue!",
      },
      {
        word: "Friendship",
        encouragement: "Outstanding! Friends are special!",
      },
      {
        word: "Adventure",
        encouragement: "Incredible! Let's go exploring!",
      },
    ],
  },
  {
    id: "class-5-6",
    title: "Class 5-6",
    description: "Advanced speaking practice",
    ageGroup: "11-13 years",
    icon: "🚀",
    color: "from-blue-400 to-purple-600",
    words: [
      {
        word: "Confidence",
        encouragement:
          "Excellent! You're speaking with confidence!",
      },
      {
        word: "Discovery",
        encouragement: "Amazing! Science helps us discover!",
      },
      {
        word: "Creativity",
        encouragement: "Wonderful! Art shows creativity!",
      },
      {
        word: "Perseverance",
        encouragement: "Outstanding! Never give up!",
      },
      {
        word: "Leadership",
        encouragement: "Fantastic! Be a great leader!",
      },
      {
        word: "Innovation",
        encouragement: "Brilliant! New ideas change the world!",
      },
    ],
  },
];

export function AcademicSamples({
  onBack,
}: AcademicSamplesProps) {
  const [currentView, setCurrentView] = useState<View>(
    "class-selection",
  );
  const [selectedClass, setSelectedClass] = useState<
    (typeof classes)[0] | null
  >(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedWords, setRecordedWords] = useState<number[]>(
    [],
  );
  const [showEncouragement, setShowEncouragement] =
    useState(false);
  const [pronunciationScore, setPronunciationScore] =
    useState<PronunciationScore>(null);
  const [showPronunciationResult, setShowPronunciationResult] =
    useState(false);
  const [
    isPlayingCorrectPronunciation,
    setIsPlayingCorrectPronunciation,
  ] = useState(false);
  const [
    showCorrectPronunciationButton,
    setShowCorrectPronunciationButton,
  ] = useState(false);

  const handleClassSelect = (
    classItem: (typeof classes)[0],
  ) => {
    setSelectedClass(classItem);
    setCurrentView("recording-session");
    setCurrentWordIndex(0);
    setRecordedWords([]);
  };

  // Simulate pronunciation accuracy scoring
  const simulatePronunciationCheck = (): PronunciationScore => {
    const scores: PronunciationScore[] = [
      "excellent",
      "good",
      "needs-practice",
    ];
    // Weighted random: 40% excellent, 40% good, 20% needs practice
    const rand = Math.random();
    if (rand < 0.4) return "excellent";
    if (rand < 0.8) return "good";
    return "needs-practice";
  };

  const handleRecord = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);

      // Simulate processing time
      setTimeout(() => {
        const score = simulatePronunciationCheck();
        setPronunciationScore(score);
        setShowPronunciationResult(true);
        setShowCorrectPronunciationButton(true);

        // Add to recorded words if pronunciation is good enough
        if (score === "excellent" || score === "good") {
          setRecordedWords([
            ...recordedWords,
            currentWordIndex,
          ]);
          setShowEncouragement(true);
        }

        // Hide result after 4 seconds
        setTimeout(() => {
          setShowPronunciationResult(false);
          setShowEncouragement(false);
        }, 4000);
      }, 1000);
    } else {
      // Start recording
      setIsRecording(true);
      setShowPronunciationResult(false);
      setPronunciationScore(null);
      // In a real app, this would start actual audio recording
    }
  };

  const handlePlayCorrectPronunciation = () => {
    setIsPlayingCorrectPronunciation(true);
    // Simulate audio playback
    setTimeout(() => {
      setIsPlayingCorrectPronunciation(false);
    }, 2000);
  };

  const handleNextWord = () => {
    if (
      selectedClass &&
      currentWordIndex < selectedClass.words.length - 1
    ) {
      setCurrentWordIndex(currentWordIndex + 1);
      setShowEncouragement(false);
      setShowPronunciationResult(false);
      setPronunciationScore(null);
      setShowCorrectPronunciationButton(false);
    }
  };

  const handlePrevWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
      setShowEncouragement(false);
      setShowPronunciationResult(false);
      setPronunciationScore(null);
      setShowCorrectPronunciationButton(false);
    }
  };

  const handleRestart = () => {
    setCurrentWordIndex(0);
    setRecordedWords([]);
    setShowEncouragement(false);
    setShowPronunciationResult(false);
    setPronunciationScore(null);
    setShowCorrectPronunciationButton(false);
  };

  const renderClassSelection = () => (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 space-background">
      {/* Floating Sparkles */}
      <div className="floating-sparkles">
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
      </div>

      {/* Shooting Stars */}
      <div
        className="shooting-star"
        style={{
          top: "20%",
          left: "10%",
          animationDelay: "0s",
        }}
      ></div>
      <div
        className="shooting-star"
        style={{
          top: "60%",
          left: "70%",
          animationDelay: "2s",
        }}
      ></div>

      {/* Constellations */}
      <div
        className="constellation"
        style={{ top: "15%", right: "20%" }}
      >
        <div className="constellation-star"></div>
        <div className="constellation-star"></div>
        <div className="constellation-star"></div>
      </div>

      <div
        className="constellation"
        style={{ bottom: "20%", left: "15%" }}
      >
        <div className="constellation-star"></div>
        <div className="constellation-star"></div>
        <div className="constellation-star"></div>
      </div>

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
              Academic Samples
            </h1>
            <div></div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12 relative">
          {/* Solar System Animation */}
          <div className="solar-system mb-8">
            <div className="sun"></div>
            <div className="planet planet-earth"></div>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 text-center">
            Choose Your Learning Adventure
          </h2>

          <p className="text-lg text-gray-400">
            Start your speaking journey with words for your age!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {classes.map((classItem) => (
            <Card
              key={classItem.id}
              className="group bg-gray-900/80 border border-gray-700 hover:border-pink-500 hover:shadow-2xl hover:glow-pink transition-all duration-300 cursor-pointer relative overflow-hidden"
              onClick={() => handleClassSelect(classItem)}
            >
              {/* Space-themed background elements for each card */}
              <div className="absolute inset-0 opacity-20">
                {classItem.id === "ukg" && (
                  <>
                    <div className="absolute top-2 right-2 text-yellow-400 kid-bounce">
                      ⭐
                    </div>
                    <div className="absolute bottom-2 left-2 text-pink-400 kid-pulse">
                      ✨
                    </div>
                  </>
                )}
                {classItem.id === "class-1-2" && (
                  <>
                    <div className="absolute top-3 right-3 text-green-400 galaxy-spiral">
                      🌍
                    </div>
                    <div className="absolute bottom-3 left-3 text-blue-400 icon-float">
                      🚀
                    </div>
                  </>
                )}
                {classItem.id === "class-3-4" && (
                  <>
                    <div className="absolute top-2 left-2 text-purple-400 twinkle">
                      🌙
                    </div>
                    <div className="absolute bottom-2 right-2 text-yellow-400 kid-bounce">
                      ☄️
                    </div>
                  </>
                )}
                {classItem.id === "class-5-6" && (
                  <>
                    <div className="absolute top-1/4 right-1/4 text-cyan-400 galaxy-spiral">
                      🌌
                    </div>
                    <div className="absolute bottom-1/4 left-1/4 text-orange-400 cosmic-dust">
                      🛸
                    </div>
                  </>
                )}
              </div>

              {classItem.isNew && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-2 py-1 rounded-full text-xs font-bold kid-pulse">
                    NEW ✨
                  </div>
                </div>
              )}

              <div className="absolute top-4 left-4 z-10">
                <div className="text-3xl kid-bounce">
                  {classItem.icon}
                </div>
              </div>

              <CardHeader className="pb-4 pt-16 relative">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${classItem.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:glow-pink transition-all duration-300 mx-auto icon-float`}
                >
                  <Mic className="w-8 h-8 text-white" />
                </div>

                <CardTitle className="text-xl text-center text-white group-hover:text-pink-300 transition-colors">
                  {classItem.title}
                </CardTitle>
                <p className="text-gray-400 text-center">
                  {classItem.description}
                </p>
                <p className="text-sm text-gray-500 text-center">
                  {classItem.ageGroup}
                </p>
              </CardHeader>

              <CardContent className="text-center relative">
                <div className="mb-4">
                  <p className="text-sm text-gray-400">
                    {classItem.words.length} words to practice
                  </p>
                </div>

                <div className="relative inline-block">
                  <Button
                    size="lg"
                    className={`bg-gradient-to-r ${classItem.color} hover:opacity-90 hover:scale-105 text-white rounded-lg px-6 transition-all duration-200 group-hover:glow-yellow relative z-10`}
                  >
                    Start Speaking
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRecordingSession = () => {
    if (!selectedClass) return null;

    const currentWord = selectedClass.words[currentWordIndex];
    const isWordRecorded =
      recordedWords.includes(currentWordIndex);
    const progress =
      (recordedWords.length / selectedClass.words.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 space-background">
        {/* Floating Sparkles for recording session */}
        <div className="floating-sparkles">
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
        </div>

        {/* Shooting Stars during recording */}
        {isRecording && (
          <>
            <div
              className="shooting-star"
              style={{
                top: "25%",
                left: "15%",
                animationDelay: "0s",
              }}
            ></div>
            <div
              className="shooting-star"
              style={{
                top: "65%",
                left: "75%",
                animationDelay: "1s",
              }}
            ></div>
          </>
        )}

        <header className="bg-black/90 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setCurrentView("class-selection")
                }
                className="text-gray-400 hover:text-gray-300 hover:bg-gray-800"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Classes
              </Button>
              <h1 className="text-lg font-semibold text-white">
                {selectedClass.title} Practice
              </h1>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRestart}
                className="text-gray-400 hover:text-gray-300 hover:bg-gray-800"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Restart
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">
                Progress
              </span>
              <span className="text-sm font-medium text-white">
                {recordedWords.length} /{" "}
                {selectedClass.words.length}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 bg-gradient-to-r ${selectedClass.color} rounded-full transition-all duration-300`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Main Word Card */}
          <Card className="mb-8 bg-gray-900/90 border border-gray-700 shadow-xl relative overflow-hidden hover:glow-pink transition-all duration-300">
            {showEncouragement && (
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center z-10">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4 animate-bounce">
                    🌟
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    {currentWord.encouragement}
                  </h3>
                  <div className="flex justify-center space-x-2">
                    <Star className="w-8 h-8 text-yellow-200 animate-pulse" />
                    <Heart className="w-8 h-8 text-red-200 animate-pulse" />
                  </div>
                </div>
              </div>
            )}

            {showPronunciationResult && (
              <div
                className={`absolute inset-0 flex items-center justify-center z-10 ${
                  pronunciationScore === "excellent"
                    ? "bg-gradient-to-r from-green-400 to-blue-500"
                    : pronunciationScore === "good"
                      ? "bg-gradient-to-r from-blue-400 to-purple-500"
                      : "bg-gradient-to-r from-orange-400 to-red-500"
                }`}
              >
                <div className="text-center text-white">
                  <div className="text-6xl mb-4 animate-bounce">
                    {pronunciationScore === "excellent"
                      ? "🌟"
                      : pronunciationScore === "good"
                        ? "👍"
                        : "🎯"}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    {pronunciationScore === "excellent"
                      ? "Excellent pronunciation!"
                      : pronunciationScore === "good"
                        ? "Good job! Keep practicing!"
                        : "Let's try again! Practice makes perfect!"}
                  </h3>
                  <div className="flex justify-center space-x-2">
                    {pronunciationScore === "excellent" && (
                      <>
                        <CheckCircle className="w-8 h-8 text-green-200 animate-pulse" />
                        <Star className="w-8 h-8 text-yellow-200 animate-pulse" />
                      </>
                    )}
                    {pronunciationScore === "good" && (
                      <>
                        <CheckCircle className="w-8 h-8 text-blue-200 animate-pulse" />
                        <Star className="w-8 h-8 text-yellow-200 animate-pulse" />
                      </>
                    )}
                    {pronunciationScore ===
                      "needs-practice" && (
                      <>
                        <RefreshCw className="w-8 h-8 text-orange-200 animate-pulse" />
                        <Heart className="w-8 h-8 text-red-200 animate-pulse" />
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            <CardContent className="p-12 text-center relative">
              {/* Reduced space decorations around the card */}
              <div className="absolute top-4 left-4 text-yellow-400 kid-bounce">
                ⭐
              </div>
              <div className="absolute bottom-4 right-4 text-blue-400 icon-float">
                🌟
              </div>

              {/* UKG Special Display with Reduced Animation */}
              {selectedClass.id === "ukg" && (
                <div className="mb-8 relative">
                  <div
                    className={`text-8xl mb-4 ${isRecording ? "kid-bounce" : "icon-float"} ${pronunciationScore ? "kid-pulse" : ""} transition-all duration-300`}
                  >
                    {currentWord.word === "Apple" && "🍎"}
                    {currentWord.word === "Ball" && "⚽"}
                    {currentWord.word === "Car" && "🚗"}
                    {currentWord.word === "Duck" && "🦆"}
                    {currentWord.word === "Fish" && "🐠"}
                    {currentWord.word === "Sun" && "☀️"}
                  </div>
                </div>
              )}

              <h2 className="text-5xl font-bold text-white mb-8">
                {currentWord.word}
              </h2>

              {/* Microphone Button */}
              <div className="mb-8 relative">
                <Button
                  size="lg"
                  onClick={handleRecord}
                  disabled={isPlayingCorrectPronunciation}
                  className={`w-32 h-32 rounded-full shadow-2xl transform transition-all duration-300 relative z-10 ${
                    isRecording
                      ? "bg-gradient-to-r from-red-400 to-pink-500 kid-pulse scale-110 glow-pink"
                      : isWordRecorded
                        ? "bg-gradient-to-r from-green-400 to-blue-500 kid-bounce glow-yellow"
                        : `bg-gradient-to-r ${selectedClass.color} hover:scale-110 hover:glow-pink icon-float`
                  } ${isPlayingCorrectPronunciation ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isRecording ? (
                    <Square className="w-12 h-12 text-white" />
                  ) : isWordRecorded ? (
                    <Trophy className="w-12 h-12 text-white" />
                  ) : (
                    <Mic className="w-12 h-12 text-white" />
                  )}
                </Button>
              </div>

              <p className="text-xl text-gray-400 mb-4">
                {isRecording
                  ? "🎤 Recording... Say the word clearly!"
                  : isWordRecorded
                    ? "🎉 Fantastic! Word recorded!"
                    : "🚀 Tap the microphone to speak!"}
              </p>

              {/* Pronunciation Score Display */}
              {pronunciationScore &&
                !showPronunciationResult && (
                  <div
                    className={`mt-6 p-6 rounded-xl ${
                      pronunciationScore === "excellent"
                        ? "bg-green-100 border-2 border-green-300"
                        : pronunciationScore === "good"
                          ? "bg-blue-100 border-2 border-blue-300"
                          : "bg-orange-100 border-2 border-orange-300"
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <div className="flex items-center space-x-2">
                        {pronunciationScore === "excellent" && (
                          <>
                            <CheckCircle className="w-8 h-8 text-green-600" />
                            <span className="text-green-700 font-bold text-lg">
                              Excellent! Perfect pronunciation!
                            </span>
                          </>
                        )}
                        {pronunciationScore === "good" && (
                          <>
                            <CheckCircle className="w-8 h-8 text-blue-600" />
                            <span className="text-blue-700 font-bold text-lg">
                              Good job! Keep practicing!
                            </span>
                          </>
                        )}
                        {pronunciationScore ===
                          "needs-practice" && (
                          <>
                            <AlertCircle className="w-8 h-8 text-orange-600" />
                            <span className="text-orange-700 font-bold text-lg">
                              Try again! Practice makes perfect!
                            </span>
                          </>
                        )}
                      </div>

                      {/* Accuracy Score */}
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">
                          Pronunciation Accuracy
                        </p>
                        <div
                          className={`text-3xl font-bold ${
                            pronunciationScore === "excellent"
                              ? "text-green-600"
                              : pronunciationScore === "good"
                                ? "text-blue-600"
                                : "text-orange-600"
                          }`}
                        >
                          {pronunciationScore === "excellent"
                            ? "95%"
                            : pronunciationScore === "good"
                              ? "78%"
                              : "45%"}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              {/* Listen to Correct Pronunciation Button */}
              {showCorrectPronunciationButton && (
                <div className="mt-6">
                  <Button
                    onClick={handlePlayCorrectPronunciation}
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:opacity-90 text-white border-0 rounded-full px-8 py-3 shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    {isPlayingCorrectPronunciation ? (
                      <>
                        <Square className="w-5 h-5 mr-2" />
                        Playing...
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-5 h-5 mr-2" />
                        Hear Correct Pronunciation
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center">
            <Button
              onClick={handlePrevWord}
              disabled={currentWordIndex === 0}
              className="bg-white/80 border-2 border-purple-300 text-purple-600 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-full px-6"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </Button>

            <div className="text-center">
              <p className="text-gray-600">
                Word {currentWordIndex + 1} of{" "}
                {selectedClass.words.length}
              </p>
              <div className="flex justify-center space-x-2 mt-2">
                {selectedClass.words.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentWordIndex
                        ? `bg-gradient-to-r ${selectedClass.color}`
                        : recordedWords.includes(index)
                          ? "bg-green-400"
                          : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <Button
              onClick={handleNextWord}
              disabled={
                currentWordIndex ===
                selectedClass.words.length - 1
              }
              className="bg-white/80 border-2 border-purple-300 text-purple-600 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-full px-6"
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Completion Message */}
          {recordedWords.length ===
            selectedClass.words.length && (
            <Card className="mt-8 bg-gradient-to-r from-green-400 to-blue-500 border-0 text-white relative overflow-hidden">
              <CardContent className="p-8 text-center relative z-10">
                <div className="text-6xl mb-4 kid-bounce">
                  🎉
                </div>
                <div className="flex justify-center space-x-4 mb-4">
                  <div
                    className="text-4xl kid-bounce"
                    style={{ animationDelay: "0s" }}
                  >
                    🏆
                  </div>
                  <div
                    className="text-4xl cosmic-dust"
                    style={{ animationDelay: "0.3s" }}
                  >
                    ⭐
                  </div>
                </div>

                <h3 className="text-3xl font-bold mb-4">
                  Galactic Achievement Unlocked!
                </h3>
                <p className="text-xl mb-6">
                  You've mastered all words in this universe!
                  You're becoming a cosmic speaker!
                </p>

                <div className="relative inline-block">
                  <Button
                    size="lg"
                    onClick={handleRestart}
                    className="bg-white text-green-600 hover:bg-green-50 hover:scale-105 rounded-full px-8 transition-all duration-200 relative z-10"
                  >
                    🔄 Explore Another Galaxy!
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  };

  return currentView === "class-selection"
    ? renderClassSelection()
    : renderRecordingSession();
}