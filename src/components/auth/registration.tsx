'use client'
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkBox";
import { useRouter } from 'next/navigation';
import { register } from '@/api/auth';
import { UserRegistrationRequest } from '@/types/auth';

export function Registration() {
    const router = useRouter();
    const [formData, setFormData] = useState<Omit<UserRegistrationRequest, 'studentId'> & { studentId: string }>({
        name: '',
        username: '',
        password: '',
        phone: '',
        department: '',
        studentId: '',
        userRole: 'GENERAL',
    });
    const [isAdmin, setIsAdmin] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAdminChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setIsAdmin(checked);
        setFormData(prev => ({ ...prev, userRole: checked ? 'ADMIN' : 'GENERAL' }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 학번 숫자로 변환
        const studentIdNumber = parseInt(formData.studentId, 10);
        if (isNaN(studentIdNumber)) {
            alert('유효한 학번을 입력해주세요.');
            return;
        }
        const registrationData: UserRegistrationRequest = {
            ...formData,
            studentId: studentIdNumber,
        };

        console.log('Sending registration data:', JSON.stringify(registrationData, null, 2));

        try {
            const response = await register(registrationData);
            console.log('회원가입 성공:', response);
            router.push('/login');
        } catch (error) {
            console.error('회원가입 중 오류 발생:', error);
            alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
        }
    };

    return (
        <div className="flex flex-col min-h-[100dvh]">
            <main className="flex-1 bg-background">
                <section className="container mx-auto py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md mx-auto">
                        <div className="space-y-4">
                            <h1 className="text-2xl sm:text-3xl font-bold">회원가입</h1>
                            <p className="text-muted-foreground text-sm sm:text-base">학교 시설을 편하게 이용해보세요! 계정을 만드세요.</p>
                        </div>
                        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                            <div className="grid gap-2">
                                <Label htmlFor="name">이름</Label>
                                <Input id="name" name="name" value={formData.name} onChange={handleChange}
                                       placeholder="이름을 입력해주세요." required/>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="username">아이디</Label>
                                <Input id="username" name="username" value={formData.username} onChange={handleChange}
                                       placeholder="사용할 아이디를 입력해주세요." required/>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">비밀번호</Label>
                                <Input id="password" name="password" type="password" value={formData.password}
                                       onChange={handleChange} placeholder="비밀번호를 입력하세요" required/>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">전화번호</Label>
                                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange}
                                       placeholder="전화번호를 입력하세요" required/>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="department">학과</Label>
                                <Input id="department" name="department" value={formData.department}
                                       onChange={handleChange} placeholder="학과를 입력하세요" required/>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="studentId">학번</Label>
                                <Input id="studentId" name="studentId" value={formData.studentId}
                                       onChange={handleChange} placeholder="학번을 입력하세요" required/>
                            </div>
                            <div className="mt-8 pt-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="isAdmin"
                                        checked={isAdmin}
                                        onChange={handleAdminChange}
                                    />
                                    <Label htmlFor="isAdmin">관리자로 회원가입</Label>
                                </div>
                            </div>
                            <Button type="submit" className="w-full mt-6">
                                가입하기!
                            </Button>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    );
}