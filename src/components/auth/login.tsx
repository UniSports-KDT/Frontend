'use client';
import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkBox"

export function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                    userRole: isAdmin ? 'ADMIN' : 'USER'
                }),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || '로그인에 실패했습니다.');
            }

            const data = await response.json();

            // JWT 토큰을 로컬 스토리지에 저장
            localStorage.setItem('token', data.token);

            // 로그인 성공 후 홈페이지로 이동
            router.push('/');
        } catch (error) {
            console.error('Login error:', error);
            setError(error instanceof Error ? error.message : '로그인 중 오류가 발생했습니다.');
        }
    }

    return (
        <div className="flex h-screen items-center justify-center bg-background">
            <div className="w-full max-w-md space-y-6 rounded-lg bg-card p-6 shadow-lg">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Welcome to UniSports</h1>
                    <p className="text-muted-foreground">Enter your username and password to sign in.</p>
                </div>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="username">사용자 이름</Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">비밀번호</Label>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Checkbox
                        id="isAdmin"
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                        label="관리자 로그인"
                    />
                    <Button type="submit" className="w-full">
                        로그인
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