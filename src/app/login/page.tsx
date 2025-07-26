
'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, LogIn } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-900 px-4">
            <div className="login-card-container">
                <div className="relative z-20 bg-gray-800 p-8 rounded-lg shadow-2xl space-y-6 border border-gray-700">
                    <div className="flex items-center justify-center space-x-3 mb-6">
                        <LogIn className="w-8 h-8 text-cyan-400"/>
                        <h1 className="text-3xl font-bold text-white tracking-wider">LOGIN</h1>
                        <Heart className="w-8 h-8 text-pink-500"/>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <Label className="text-sm font-medium text-gray-300" htmlFor="username">
                                Username
                            </Label>
                            <Input 
                                type="text" 
                                id="username" 
                                placeholder="Enter your username" 
                                className="mt-1 bg-gray-900/50 border-gray-700 text-white focus:ring-cyan-500 focus:border-cyan-500"
                            />
                        </div>
                        <div>
                            <Label className="text-sm font-medium text-gray-300" htmlFor="password">
                                Password
                            </Label>
                            <Input 
                                type="password" 
                                id="password" 
                                placeholder="Enter your password" 
                                className="mt-1 bg-gray-900/50 border-gray-700 text-white focus:ring-cyan-500 focus:border-cyan-500"
                            />
                        </div>
                    </div>
                    
                    <Button 
                        className="w-full bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-bold text-lg transition-all duration-300 transform hover:scale-105"
                    >
                        Sign In
                    </Button>
                    
                    <div className="flex justify-between items-center text-sm">
                        <Link href="#" className="font-medium text-gray-400 hover:text-cyan-400">
                            Forgot Password?
                        </Link>
                        <Link href="#" className="font-bold text-pink-500 hover:text-pink-400">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
