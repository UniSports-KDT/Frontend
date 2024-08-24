import { UserRegistrationRequest, UserRegistrationResponse, LoginRequest, LoginResponse } from '@/types/auth';
const API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);

//회원가입
export async function register(user: UserRegistrationRequest): Promise<UserRegistrationResponse> {
    console.log('API received data:', JSON.stringify(user, null, 2));
    try {
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
            credentials: 'include',
        });
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        const responseText = await response.text();
        console.log('Response text:', responseText);
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
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });
        if (!response.ok) {
            throw new Error('Login failed');
        }
        return response.json();
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}
