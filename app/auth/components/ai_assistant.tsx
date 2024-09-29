import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendIcon, Loader2Icon, MinimizeIcon, MaximizeIcon } from 'lucide-react';
import Typewriter from 'typewriter-effect';
import Links from '@/components/work/links';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, RandomizedLight, useAnimations, useFBX, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import CanvasLoader from "./Loader";

interface LandingPageProps {
  onNavigate: (section: string) => void;
}

interface Message {
  role: string;
  content: string;
}

function Player({ isMobile }: { isMobile: boolean }) {
  const group = useRef<THREE.Group>();
  const [animationsLoaded, setAnimationsLoaded] = useState(false);

  const { nodes, materials, scene } = useGLTF("/assets/3D/player.gltf");
  const { animations: waveAnimation } = useFBX("/assets/3D/standing-greeting.fbx");
  scene.frustumCulled = false;

  waveAnimation[0].name = "wave-animation";

  const { actions } = useAnimations(waveAnimation, group);

  useEffect(() => {
    if (waveAnimation && actions["wave-animation"]) {
      setAnimationsLoaded(true);
    }
    if (animationsLoaded) {
      actions["wave-animation"]?.reset().play();
    }
  }, [animationsLoaded, waveAnimation, actions]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (waveAnimation && actions["wave-animation"]) {
        setAnimationsLoaded(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [waveAnimation, actions]);

  return (
    <>
      <ambientLight intensity={1} />
      <PerspectiveCamera
        makeDefault
        position={[0, 55, -40]}
        fov={30}
        near={1}
        far={120}
        zoom={isMobile ? 2 : 3}
      />
      <RandomizedLight position={[0, 1, 0]} />
      <pointLight intensity={2} position={[1, 1.5, 0]} color="#804dee" />
      <pointLight intensity={2} position={[-1, 1.5, 1]} color="#4b42a7" />
      <pointLight intensity={2} position={[-1, 0.5, 1]} color="#804dee" />
      {!isMobile && (
        <OrbitControls
          makeDefault
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enableDamping={true}
          dampingFactor={0.05}
          enablePan={false}
          autoRotate={false}
        />
      )}
      <Suspense fallback={<CanvasLoader />}>
        <primitive
          object={scene}
          ref={group}
          rotation={[0, Math.PI, 0]}
          position={isMobile ? [0, -3, 0] : [0, -2, 0]}
          scale={isMobile ? 2 : 4}
        />
      </Suspense>
    </>
  );
}

function PlayerCanvas({ isMobile }: { isMobile: boolean }) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{
        outputColorSpace: THREE.SRGBColorSpace,
        alpha: true,
      }}
      style={{ width: '100%', height: isMobile ? '300px' : '990px' }}
    >
      <Player isMobile={isMobile} />
    </Canvas>
  );
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [nameTyped, setNameTyped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAI(true);
      setConversation([{ 
        role: 'assistant', 
        content: "Welcome to Yashwanth's portfolio! I'm here to help you navigate. How can I assist you today?"
      }]);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      fetchAIResponse();
    }
  };

  const fetchAIResponse = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    const newMessage: Message = { role: 'user', content: input };
    setConversation(prev => [...prev, newMessage]);

    try {
      const res = await fetch('/api/groqAssistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversation: [...conversation, newMessage] }),
      });
      const data = await res.json();
      const aiResponse: Message = { role: 'assistant', content: data.response };
      setConversation(prev => [...prev, aiResponse]);

      if (data.navigation) {
        onNavigate(data.navigation.replace('#', ''));
      }
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setConversation(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="max-w-full mx-auto h-full flex flex-col md:flex-row items-center justify-between p-8">
        {/* 3D Model - Now fully to the left */}
        <div className="w-full md:w-1/5 h-1/2 md:h-full">
          <PlayerCanvas isMobile={isMobile} />
        </div>

        {/* Text Content - Now centered and wider */}
        <div className="w-full md:w-2/3 text-center mt-8 md:mt-0 px-4 md:px-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-gray-800 whitespace-nowrap">
            {!nameTyped ? (
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString("Hello, I'm Yashwanth Jawaji")
                    .callFunction(() => setNameTyped(true))
                    .start();
                }}
                options={{ cursor: '' }}
              />
            ) : (
              "Hello, I'm Yashwanth Jawaji"
            )}
          </h1>
          <div className="text-xl md:text-2xl lg:text-3xl mb-8 text-gray-700">
            {nameTyped && (
              <Typewriter
                options={{
                  strings: [
                    "A passionate web developer",
                    "Specializing in React and Next.js",
                    "Creating modern web experiences"
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 20,
                }}
              />
            )}
          </div>
          <Links className="text-3xl space-x-4" />
        </div>
        {/* AI Chat */}
        <AnimatePresence>
          {showAI && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
              className={`fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 ${
                isChatMinimized ? 'w-12 h-12' : 'w-80 h-96'
              } flex flex-col`}
            >
              {!isChatMinimized && (
                <>
                  <div className="flex-grow space-y-2 mb-4 overflow-y-auto">
                    {conversation.map((message, index) => (
                      <div key={index} className={`p-2 rounded-lg ${message.role === 'assistant' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                        <strong>{message.role === 'assistant' ? 'AI:' : 'You:'}</strong> {message.content}
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex items-center justify-center p-2">
                        <Loader2Icon className="animate-spin mr-2" />
                        <span>AI is thinking...</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="text"
                      placeholder="Ask about Yashwanth's portfolio..."
                      value={input}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      className="flex-grow"
                    />
                    <Button onClick={fetchAIResponse} disabled={isLoading}>
                      {isLoading ? <Loader2Icon className="animate-spin" /> : <SendIcon />}
                    </Button>
                  </div>
                </>
              )}
              <Button
                className="absolute top-2 right-2"
                variant="ghost"
                size="sm"
                onClick={() => setIsChatMinimized(!isChatMinimized)}
              >
                {isChatMinimized ? <MaximizeIcon /> : <MinimizeIcon />}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LandingPage;