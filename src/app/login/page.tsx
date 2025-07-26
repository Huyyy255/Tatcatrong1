
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, LogIn } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import LoadingOverlay from "@/components/ui/loading-overlay";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { toast } = useToast();
    const isMaintenanceMode = false; // Bật/tắt chế độ bảo trì ở đây

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (isMaintenanceMode) {
            toast({
                title: "Thông báo bảo trì",
                description: "Hệ thống đang tạm thời bảo trì để nâng cấp. Vui lòng quay lại sau.",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast({
                title: "Thành công!",
                description: "Bạn đã đăng nhập thành công.",
            });
            // Redirect to home page after successful login
            window.location.href = '/';
        } catch (error: any) {
            console.error("Authentication error:", error);
            let errorMessage = "Đã xảy ra lỗi. Vui lòng thử lại.";
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                errorMessage = "Email hoặc mật khẩu không chính xác.";
            }
             if (error.code === 'auth/invalid-email') {
                errorMessage = "Địa chỉ email không hợp lệ.";
            }
            toast({
                title: "Đăng nhập thất bại",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <LoadingOverlay show={loading} />
            <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-background/95 px-4">
                <div className="login-card-container">
                    <form onSubmit={handleSubmit} className="relative z-20 bg-card p-8 rounded-2xl shadow-2xl space-y-6 border border-border">
                        <div className="flex items-center justify-center space-x-3 mb-6">
                            <LogIn className="w-8 h-8 text-cyan-400"/>
                            <h1 className="text-3xl font-bold text-foreground tracking-wider">
                                {isMaintenanceMode ? "BẢO TRÌ" : "LOGIN"}
                            </h1>
                            <Heart className="w-8 h-8 text-pink-500"/>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <Label className="text-sm font-medium text-muted-foreground" htmlFor="email">
                                    Email
                                </Label>
                                <Input 
                                    type="email" 
                                    id="email" 
                                    placeholder="Enter your email" 
                                    className="mt-1 bg-background/50 border-border focus:ring-cyan-500 focus:border-cyan-500"
                                    required
                                    disabled={loading || isMaintenanceMode}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    disabled={loading || isMaintenanceMode}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        
                        <Button 
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg transition-all duration-300 transform hover:scale-105"
                            disabled={loading || isMaintenanceMode}
                        >
                            {isMaintenanceMode ? "Đang bảo trì" : "Sign In"}
                        </Button>
                        
                        <div className="flex justify-between items-center text-sm">
                            <Link href="#" className="font-medium text-muted-foreground hover:text-primary">
                                Forgot Password?
                            </Link>
                            <Link href="/register" className="font-bold text-pink-500 hover:text-pink-400">
                                Sign Up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
