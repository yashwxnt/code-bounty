'use client';

import { useEffect, useState } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import '../ui/TypeWriter.css';

const Welcome = () => {
    const textReveal = "Embark on a thrilling quest with Code Bounty, where coding meets adventure! Dive into interactive challenges, hunt down bugs, solve puzzles, and claim your rewards as you improve your programming skills. Whether you're a beginner or a seasoned pro, Code Bounty offers a fun, engaging way to level up your coding knowledge. Unlock achievements, rise through the ranks, and become a true coding bounty hunter!";
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
            <CardTitle className="p-3 font-brenet-outline text-center">
                Code Bounty: The Ultimate Gamified Coding Adventure!
            </CardTitle>
            <CardDescription className="text-center font-brenet-regular text-violet-400 mx-auto animate-typing">
                {displayedText}
            </CardDescription>
        </Card>
    );
}

export default Welcome;