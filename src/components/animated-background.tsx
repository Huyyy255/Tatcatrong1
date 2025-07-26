
"use client";

export default function AnimatedBackground() {
    return (
        <div className="fixed inset-0 -z-10 min-h-screen w-full bg-background/95">
            <div className="login-card-container absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%]">
                 <div className="relative z-20 h-full w-full"></div>
            </div>
        </div>
    );
}
