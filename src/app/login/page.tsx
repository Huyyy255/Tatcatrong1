
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
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
                    <form onSubmit={handleSubmit} className="relative z-20 p-8 space-y-6">
                        <div className="flex flex-col items-center justify-center space-y-2 mb-6 text-center">
                            <h1 className="text-3xl font-bold font-headline text-foreground tracking-wider">
                                {isMaintenanceMode ? "BẢO TRÌ" : "Đăng nhập"}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Chào mừng trở lại!
                            </p>
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
                                    disabled={loading || isMaintenanceMode}
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
                                    disabled={loading || isMaintenanceMode}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        
                        <Button 
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base transition-all duration-300 transform hover:scale-105"
                            disabled={loading || isMaintenanceMode}
                        >
                             <LogIn className="mr-2 h-4 w-4" />
                            {isMaintenanceMode ? "Đang bảo trì" : "Đăng nhập"}
                        </Button>
                        
                        <div className="flex justify-between items-center text-xs">
                            <Link href="#" className="font-medium text-muted-foreground hover:text-primary">
                                Quên mật khẩu?
                            </Link>
                            <Link href="/register" className="font-bold text-primary hover:text-primary/80">
                                Tạo tài khoản mới
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
