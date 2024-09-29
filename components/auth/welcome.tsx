'use client'

import { useEffect, useState } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import '../ui/TypeWriter.css';

const Welcome = () => {

    const textReveal = "The ultimate gamified platform for coding and education! Dive into interactive challenges, explore coding puzzles, and unlock achievements as you enhance your programming skills. Whether you're a beginner or an experienced coder, CodeXplore offers a fun and engaging way to learn and grow.";

    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let currentIndex = 0;
        const intervalId = setInterval(() => {
            setDisplayedText(prev => prev + textReveal[currentIndex]);
            currentIndex++;
            if (currentIndex === textReveal.length) {
                clearInterval(intervalId);
            }
        }, 50); // Adjust the speed by changing this value
        return () => clearInterval(intervalId);
    }, []);

    return (
        <Card className="w-1/2 h-2/4 flex flex-col justify-center items-center bg-transparent border-none text-white">
            <CardTitle className="p-3 font-brenet-outline">
                Welcome to CodeExplore
            </CardTitle>
            <CardDescription className="text-center font-brenet-regular text-violet-400 mx-auto animate-typing">
                {displayedText}
            </CardDescription>
        </Card>
    );
}

export default Welcome;
 