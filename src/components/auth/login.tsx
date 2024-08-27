'use client';
import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { login } from '@/api/auth'
import { LoginRequest } from '@/types/auth'
import { useAuth } from "@/contexts/AuthContext";

export function Login() {
    const [formData, setFormData] = useState<LoginRequest>({
        username: "",
        password: "",
    })
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { login: authLogin } = useAuth()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await login(formData);
            console.log('Login successful:', response);
            authLogin(response.token, response.username, response.userId);
            alert('로그인 완료')
            router.push('/');
        } catch(error) {
            console.error('로그인 중 에러 발생:', error);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex h-screen items-center justify-center bg-background">
            <div className="w-full max-w-md space-y-6 rounded-lg bg-card p-6 shadow-lg">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Welcome to UniSports</h1>
                    <p className="text-muted-foreground">학교 스포츠 시설을 편하게 이용해보세요!</p>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="username">사용자 이름</Label>
                        <Input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="username"
                            required
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">비밀번호</Label>
                        </div>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? '로그인 중...' : '로그인'}
                    </Button>
                </form>
                <div className="text-center text-sm text-muted-foreground">
                    아이디가 없으신가요?{" "}
                    <Link href="/signup" className="text-primary hover:underline">
                        회원가입
                    </Link>
                </div>
            </div>
        </div>
    )
}