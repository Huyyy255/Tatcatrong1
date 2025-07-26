
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";
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
                    <form onSubmit={handleSubmit} className="relative z-20 p-8 space-y-6">
                        <div className="flex flex-col items-center justify-center space-y-2 mb-6 text-center">
                            <h1 className="text-3xl font-bold font-headline text-foreground tracking-wider">Tạo tài khoản</h1>
                            <p className="text-sm text-muted-foreground">Bắt đầu hành trình của bạn.</p>
                        </div>
                        
                        <div className="space-y-4">
                             <div>
                                <Label className="text-xs font-medium text-muted-foreground" htmlFor="email">
                                    Email
                                </Label>
                                <Input 
                                    type="email" 
                                    id="email" 
                                    placeholder="Enter your email" 
                                    className="mt-1 bg-transparent/50 border-white/20 focus:ring-primary/50 focus:border-primary/50"
                                    required
                                    disabled={loading}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label className="text-xs font-medium text-muted-foreground" htmlFor="password">
                                    Mật khẩu
                                </Label>
                                <Input 
                                    type="password" 
                                    id="password" 
                                    placeholder="Enter your password" 
                                    className="mt-1 bg-transparent/50 border-white/20 focus:ring-primary/50 focus:border-primary/50"
                                    required
                                    disabled={loading}
                                     value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                             <div>
                                <Label className="text-xs font-medium text-muted-foreground" htmlFor="confirm-password">
                                    Xác nhận mật khẩu
                                </Label>
                                <Input 
                                    type="password" 
                                    id="confirm-password" 
                                    placeholder="Confirm your password" 
                                    className="mt-1 bg-transparent/50 border-white/20 focus:ring-primary/50 focus:border-primary/50"
                                    required
                                    disabled={loading}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        
                        <Button 
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base transition-all duration-300 transform hover:scale-105"
                            disabled={loading}
                        >
                            <UserPlus className="mr-2 h-4 w-4" />
                            Đăng ký
                        </Button>
                        
                        <div className="text-center text-xs">
                            <span className="text-muted-foreground">Đã có tài khoản? </span>
                            <Link href="/login" className="font-bold text-primary hover:text-primary/80">
                                Đăng nhập
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
