import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Login() {
    return (
        <div className="flex h-screen items-center justify-center bg-background">
            <div className="w-full max-w-md space-y-6 rounded-lg bg-card p-6 shadow-lg">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Welcome to UniSports</h1>
                    <p className="text-muted-foreground">Enter your email and password to sign in.</p>
                </div>
                <form className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">아아디</Label>
                        <Input id="email" type="email" placeholder="example@email.com" required/>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">비밀번호</Label>
                            <Link href="#" className="text-sm text-primary hover:underline" prefetch={false}>
                                비밀번호 찾기
                            </Link>
                        </div>
                        <Input id="password" type="password" required/>
                    </div>
                    <Button type="submit" className="w-full">
                        로그인
                    </Button>
                </form>
                <div className="text-center text-sm text-muted-foreground">
                    아이디가 없으신가요?{" "}
                    <Link href="#" className="text-primary hover:underline" prefetch={false}>
                        회원가입
                    </Link>
                </div>
            </div>
        </div>
    )
}
