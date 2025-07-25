
"use client";

import { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";

const wishes = [
  "Chúc mừng sinh nhật! Tuổi mới gặt hái nhiều thành công mới!",
  "Chúc bạn tuổi 14 thật rực rỡ, đầy ắp tiếng cười và niềm vui.",
  "Happy Birthday! Mong mọi điều ước của bạn đều trở thành hiện thực.",
  "Chúc Huy một tuổi mới luôn mạnh khỏe, hạnh phúc và an lành.",
  "Thêm một tuổi, thêm nhiều trải nghiệm. Chúc bạn một hành trình tuyệt vời!",
  "Chúc bạn sinh nhật vui vẻ bên gia đình và những người thân yêu.",
  "Tuổi mới với những mục tiêu mới, thành công mới đang chờ bạn phía trước!",
  "Chúc bạn luôn giữ được ngọn lửa đam mê và theo đuổi ước mơ của mình.",
  "Sinh nhật thật vui, nhận được nhiều quà và lời chúc ý nghĩa nhé!",
  "Chúc mừng chàng trai 14 tuổi! Hãy tận hưởng ngày đặc biệt này nhé."
];

const BirthdayCakeSVG = ({ animationState }: { animationState: string }) => {
    return (
        <svg viewBox="0 0 200 200" className="w-64 h-64 drop-shadow-lg">
            <defs>
                <filter id="wind-effect" x="-50%" y="-50%" width="200%" height="200%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.1 0" numOctaves="1" result="turbulence"/>
                    <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="5" xChannelSelector="R" yChannelSelector="G"/>
                    <animate attributeName="baseFrequency" from="0.1 0" to="0.2 0" dur="0.3s" repeatCount="1" begin="0s" />
                </filter>
            </defs>
            <g className={cn("transition-opacity duration-1000", animationState.startsWith('cake-') ? 'opacity-100' : 'opacity-0')}>
                {/* Cake Layers */}
                <path d="M40 120 Q35 140 40 160 L160 160 Q165 140 160 120 Z" fill="#F2A2C8" />
                <path d="M40 120 L160 120 L160 100 L40 100 Z" fill="#8E5A6F" />
                <path d="M40 100 Q35 80 40 60 L160 60 Q165 80 160 100 Z" fill="#F2A2C8" />
                <ellipse cx="100" cy="60" rx="60" ry="15" fill="#FFF" />

                {/* Candles & Flames */}
                {[70, 100, 130].map(x => (
                    <g key={x}>
                        <rect x={x-2.5} y="40" width="5" height="20" fill="#42A5F5" />
                        <g className={cn("transition-opacity duration-300", animationState === 'cake-lit' ? 'opacity-100' : 'opacity-0')}>
                            <ellipse cx={x} cy="35" rx="3" ry="8" fill="orange" >
                                <animate attributeName="ry" values="8;10;8" dur="0.5s" repeatCount="indefinite" />
                            </ellipse>
                            <ellipse cx={x} cy="32" rx="2" ry="5" fill="yellow" >
                                 <animate attributeName="ry" values="5;7;5" dur="0.5s" repeatCount="indefinite" />
                            </ellipse>
                        </g>
                    </g>
                ))}
            </g>
            
            {/* Wind effect placeholder */}
            <rect x="-200" y="0" width="200" height="200" fill="transparent"
                className={cn(animationState === 'wind' ? 'animate-wind-blow' : 'hidden')}
                style={{ filter: 'url(#wind-effect)' }}
            />
            
            {/* Age Number */}
            <text x="100" y="130"
                fontFamily="Space Grotesk, sans-serif"
                fontSize="80"
                fontWeight="bold"
                textAnchor="middle"
                fill="hsl(var(--primary))"
                className={cn("transition-opacity duration-1000", animationState === 'age-reveal' ? 'opacity-100' : 'opacity-0')}
            >
                14
            </text>

            <style jsx>{`
                @keyframes wind-blow {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(200%); }
                }
                .animate-wind-blow {
                    animation: wind-blow 0.5s ease-in forwards;
                }
            `}</style>
        </svg>
    );
};


export default function BirthdayExperience() {
    const [currentWish, setCurrentWish] = useState(wishes[0]);
    const [animationState, setAnimationState] = useState('cake-lit'); // cake-lit -> wind -> cake-blown -> age-reveal

    useEffect(() => {
        const wishInterval = setInterval(() => {
            setCurrentWish(prev => {
                const currentIndex = wishes.indexOf(prev);
                return wishes[(currentIndex + 1) % wishes.length];
            });
        }, 3000);

        const animationSequence = () => {
             // 1. Show lit cake (initial state)
            
            // 2. Start wind animation after a delay
            setTimeout(() => setAnimationState('wind'), 100);

            // 3. Change state to blown out cake
            setTimeout(() => setAnimationState('cake-blown'), 600);
            
            // 4. Reveal age
            setTimeout(() => setAnimationState('age-reveal'), 1100);
        };
        
        animationSequence();

        return () => clearInterval(wishInterval);
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="text-center">
                 <BirthdayCakeSVG animationState={animationState} />

                <div className="h-10 mt-4">
                     <p key={currentWish} className="font-headline text-2xl text-foreground animate-fade-in-out">
                        {currentWish}
                    </p>
                </div>
            </div>
             <style jsx>{`
                @keyframes fade-in-out {
                    0% { opacity: 0; transform: translateY(10px); }
                    20% { opacity: 1; transform: translateY(0); }
                    80% { opacity: 1; transform: translateY(0); }
                    100% { opacity: 0; transform: translateY(-10px); }
                }
                .animate-fade-in-out {
                    animation: fade-in-out 3s ease-in-out forwards;
                }
            `}</style>
        </div>
    );
}
