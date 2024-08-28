import { UserRegistrationRequest, UserRegistrationResponse, LoginRequest, LoginResponse } from '@/types/auth';
import {jwtDecode} from "jwt-decode";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

//회원가입
export async function register(user: UserRegistrationRequest): Promise<UserRegistrationResponse> {
    try {
        const response = await fetch(`/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
}

//로그인
export async function login(loginData: LoginRequest): Promise<LoginResponse> {
    try {
        const response = await fetch(`/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
            credentials: 'include',
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || `로그인 실패: ${response.status} ${response.statusText}`);
        }
        const { token } = await response.json();

        if (!token) {
            throw new Error('토큰이 없습니다.');
        }

        // 토큰 디코딩
        const decodedToken: any = jwtDecode(token);
        console.log('Decoded token:', decodedToken);

        const username = decodedToken.sub;

        return {
            token,
            username,
            userId: decodedToken.userId,
        };
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}
