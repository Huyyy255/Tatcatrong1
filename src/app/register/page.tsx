
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Heart } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import LoadingOverlay from "@/components/ui/loading-overlay";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";


export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast({
                title: "Lỗi",
                description: "Mật khẩu xác nhận không khớp.",
                variant: "destructive",
            });
            return;
        }
        setLoading(true);
        
        try {
            await createUserWithEmailAndPassword(auth, email, password);
             toast({
                title: "Thành công!",
                description: "Tài khoản của bạn đã được tạo. Đang chuyển hướng đến trang đăng nhập...",
            });
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);

        } catch (error: any) {
             console.error("Registration error:", error);
            let errorMessage = "Đã xảy ra lỗi. Vui lòng thử lại.";
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = "Địa chỉ email này đã được sử dụng.";
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = "Địa chỉ email không hợp lệ.";
            } else if (error.code === 'auth/weak-password') {
                errorMessage = "Mật khẩu quá yếu. Vui lòng sử dụng mật khẩu mạnh hơn.";
            }
            toast({
                title: "Đăng ký thất bại",
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
                            <UserPlus className="w-8 h-8 text-cyan-400"/>
                            <h1 className="text-3xl font-bold text-foreground tracking-wider">REGISTER</h1>
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
                                    disabled={loading}
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
                                    disabled={loading}
                                     value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                             <div>
                                <Label className="text-sm font-medium text-muted-foreground" htmlFor="confirm-password">
                                    Confirm Password
                                </Label>
                                <Input 
                                    type="password" 
                                    id="confirm-password" 
                                    placeholder="Confirm your password" 
                                    className="mt-1 bg-background/50 border-border focus:ring-cyan-500 focus:border-cyan-500"
                                    required
                                    disabled={loading}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        
                        <Button 
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg transition-all duration-300 transform hover:scale-105"
                            disabled={loading}
                        >
                            Sign Up
                        </Button>
                        
                        <div className="text-center text-sm">
                            <span className="text-muted-foreground">Already have an account? </span>
                            <Link href="/login" className="font-bold text-pink-500 hover:text-pink-400">
                                Sign In
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
