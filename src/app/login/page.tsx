
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, LogIn } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import LoadingOverlay from "@/components/ui/loading-overlay";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            toast({
                title: "Thành công!",
                description: "Bạn đã đăng nhập thành công.",
            });
        }, 1500);
    };

    return (
        <>
            <LoadingOverlay show={loading} />
            <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-background/95 px-4">
                <div className="login-card-container">
                    <form onSubmit={handleSubmit} className="relative z-20 bg-card p-8 rounded-lg shadow-2xl space-y-6 border border-border">
                        <div className="flex items-center justify-center space-x-3 mb-6">
                            <LogIn className="w-8 h-8 text-cyan-400"/>
                            <h1 className="text-3xl font-bold text-foreground tracking-wider">LOGIN</h1>
                            <Heart className="w-8 h-8 text-pink-500"/>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <Label className="text-sm font-medium text-muted-foreground" htmlFor="username">
                                    Username
                                </Label>
                                <Input 
                                    type="text" 
                                    id="username" 
                                    placeholder="Enter your username" 
                                    className="mt-1 bg-background/50 border-border focus:ring-cyan-500 focus:border-cyan-500"
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-muted-foreground" htmlFor="password">
                                    Password
                                </Label>
                                <Input 
                                    type="password" 
                                    id="password" 
                                    placeholder="Enter your password" 
                                    className="mt-1 bg-background/50 border-border focus:ring-cyan-500 focus:border-cyan-500"
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>
                        
                        <Button 
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg transition-all duration-300 transform hover:scale-105"
                            disabled={loading}
                        >
                            Sign In
                        </Button>
                        
                        <div className="flex justify-between items-center text-sm">
                            <Link href="#" className="font-medium text-muted-foreground hover:text-primary">
                                Forgot Password?
                            </Link>
                            <Link href="#" className="font-bold text-pink-500 hover:text-pink-400">
                                Sign Up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
