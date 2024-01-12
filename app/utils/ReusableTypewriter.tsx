"use client";

import { Typewriter } from "react-simple-typewriter";

interface ReusableTypewriterProps {
    text: string | "";
    loop: number;
    speed: number;
}

export default function ReusableTypewriter({ text, loop, speed }: ReusableTypewriterProps) {
    return (
        <>
            <Typewriter
                words={[text]}
                loop={loop}
                cursor
                cursorStyle=""
                typeSpeed={speed}
                deleteSpeed={50}
                delaySpeed={1000}
            />
        </>
    );
}
