import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

interface MelloAssistantProps {
  state?: 'idle' | 'talking' | 'waving' | 'celebrating' | 'thinking';
  message?: string;
  showMessage?: boolean;
  onMessageDismiss?: () => void;
  position?: 'bottom-right' | 'bottom-left' | 'center';
}

export function MelloAssistant({ 
  state = 'idle', 
  message = 'Hi! I\'m Mello, your AI learning companion!',
  showMessage = true,
  onMessageDismiss,
  position = 'bottom-right'
}: MelloAssistantProps) {
  const [isBlinking, setIsBlinking] = useState(false);
  const [eyeScale, setEyeScale] = useState(1);

  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Eye sparkle animation
  useEffect(() => {
    const sparkleInterval = setInterval(() => {
      setEyeScale(1.1);
      setTimeout(() => setEyeScale(1), 200);
    }, 4000);

    return () => clearInterval(sparkleInterval);
  }, []);

  const positionClasses = {
    'bottom-right': 'bottom-8 right-8',
    'bottom-left': 'bottom-8 left-8',
    'center': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      {/* Message Bubble */}
      <AnimatePresence>
        {showMessage && message && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3, type: 'spring' }}
            className="absolute bottom-full mb-4 right-0 max-w-xs"
          >
            <div className="relative bg-gradient-to-br from-[#141A2A] to-[#273043] border-2 border-[#7A3CF4]/50 rounded-2xl p-4 shadow-2xl shadow-[#7A3CF4]/30">
              {/* Speech bubble arrow */}
              <div className="absolute -bottom-2 right-12 w-4 h-4 bg-[#273043] border-r-2 border-b-2 border-[#7A3CF4]/50 transform rotate-45" />
              
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#7A3CF4] flex-shrink-0 mt-0.5" />
                <p className="text-white text-sm leading-relaxed">{message}</p>
                {onMessageDismiss && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onMessageDismiss}
                    className="p-0 h-5 w-5 ml-auto flex-shrink-0 text-[#B9C2D0] hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mello Character */}
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative cursor-pointer"
      >
        {/* Glow effect behind Mello */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 bg-gradient-to-br from-[#7A3CF4] to-[#4B8BFF] rounded-full blur-3xl"
        />

        {/* Floating sparkles */}
        {state === 'celebrating' && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: [0, (Math.random() - 0.5) * 100],
                  y: [0, -Math.random() * 80],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                }}
              >
                <Sparkles className="w-4 h-4 text-[#7A3CF4]" />
              </motion.div>
            ))}
          </>
        )}

        {/* Mello SVG Character */}
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          <defs>
            {/* Cloud gradient */}
            <radialGradient id="cloudGradient">
              <stop offset="0%" stopColor="#E0F2FE" />
              <stop offset="50%" stopColor="#BAE6FD" />
              <stop offset="100%" stopColor="#7DD3FC" />
            </radialGradient>

            {/* Glow filter */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Eye sparkle gradient */}
            <radialGradient id="eyeGradient">
              <stop offset="0%" stopColor="#4B8BFF" />
              <stop offset="100%" stopColor="#0EA5E9" />
            </radialGradient>
          </defs>

          {/* Shadow */}
          <ellipse
            cx="60"
            cy="105"
            rx="35"
            ry="8"
            fill="#0B0F19"
            opacity="0.3"
          />

          {/* Cloud body - main */}
          <motion.circle
            cx="60"
            cy="60"
            r="35"
            fill="url(#cloudGradient)"
            filter="url(#glow)"
            animate={state === 'waving' ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.5, repeat: state === 'waving' ? Infinity : 0 }}
          />

          {/* Cloud puffs - left */}
          <circle cx="35" cy="55" r="22" fill="url(#cloudGradient)" opacity="0.9" />
          
          {/* Cloud puffs - right */}
          <circle cx="85" cy="55" r="22" fill="url(#cloudGradient)" opacity="0.9" />
          
          {/* Cloud puffs - top */}
          <circle cx="60" cy="40" r="20" fill="url(#cloudGradient)" opacity="0.95" />

          {/* Neon outline/glow */}
          <motion.circle
            cx="60"
            cy="60"
            r="38"
            fill="none"
            stroke="url(#eyeGradient)"
            strokeWidth="2"
            opacity="0.4"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Left eye */}
          <motion.g
            animate={{
              scaleY: isBlinking ? 0.1 : 1,
            }}
            transition={{ duration: 0.1 }}
          >
            <ellipse
              cx="48"
              cy="55"
              rx="6"
              ry="8"
              fill="url(#eyeGradient)"
            />
            {/* Eye shine */}
            <motion.circle
              cx="50"
              cy="53"
              r="2"
              fill="white"
              animate={{ scale: eyeScale }}
              transition={{ duration: 0.2 }}
            />
            {/* Eye sparkle */}
            <circle cx="47" cy="57" r="1" fill="#BAE6FD" opacity="0.8" />
          </motion.g>

          {/* Right eye */}
          <motion.g
            animate={{
              scaleY: isBlinking ? 0.1 : 1,
            }}
            transition={{ duration: 0.1 }}
          >
            <ellipse
              cx="72"
              cy="55"
              rx="6"
              ry="8"
              fill="url(#eyeGradient)"
            />
            {/* Eye shine */}
            <motion.circle
              cx="74"
              cy="53"
              r="2"
              fill="white"
              animate={{ scale: eyeScale }}
              transition={{ duration: 0.2 }}
            />
            {/* Eye sparkle */}
            <circle cx="71" cy="57" r="1" fill="#BAE6FD" opacity="0.8" />
          </motion.g>

          {/* Mouth */}
          <motion.path
            d={
              state === 'talking'
                ? 'M 48 70 Q 60 75 72 70'
                : state === 'celebrating'
                ? 'M 45 68 Q 60 80 75 68'
                : 'M 48 68 Q 60 74 72 68'
            }
            stroke="#7A3CF4"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            animate={
              state === 'talking'
                ? {
                    d: [
                      'M 48 70 Q 60 75 72 70',
                      'M 48 68 Q 60 73 72 68',
                      'M 48 70 Q 60 75 72 70',
                    ],
                  }
                : {}
            }
            transition={{
              duration: 0.4,
              repeat: state === 'talking' ? Infinity : 0,
            }}
            filter="url(#glow)"
          />

          {/* Cheeks */}
          <circle cx="38" cy="62" r="5" fill="#FCA5A5" opacity="0.6" />
          <circle cx="82" cy="62" r="5" fill="#FCA5A5" opacity="0.6" />

          {/* Waving hand (only in waving state) */}
          {state === 'waving' && (
            <motion.g
              animate={{
                rotate: [0, 20, -20, 20, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
              style={{ transformOrigin: '95px 50px' }}
            >
              <ellipse
                cx="95"
                cy="50"
                rx="8"
                ry="12"
                fill="url(#cloudGradient)"
                opacity="0.9"
              />
              <circle cx="95" cy="45" r="4" fill="url(#cloudGradient)" opacity="0.8" />
            </motion.g>
          )}

          {/* Thinking dots (only in thinking state) */}
          {state === 'thinking' && (
            <g>
              <motion.circle
                cx="50"
                cy="75"
                r="2"
                fill="#7A3CF4"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
              />
              <motion.circle
                cx="60"
                cy="75"
                r="2"
                fill="#7A3CF4"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              />
              <motion.circle
                cx="70"
                cy="75"
                r="2"
                fill="#7A3CF4"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              />
            </g>
          )}
        </svg>

        {/* Pulsing ring effect */}
        <motion.div
          animate={{
            scale: [1, 1.3],
            opacity: [0.3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
          className="absolute inset-0 border-2 border-[#7A3CF4] rounded-full"
        />
      </motion.div>
    </div>
  );
}
