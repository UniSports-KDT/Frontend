export interface UserRegistrationRequest {
    name: string;
    username: string;
    password: string;
    phone: string;
    department: string;
    studentId: number;
    userRole: 'GENERAL' | 'ADMIN';
}

export interface UserRegistrationResponse {
    id: number;
    name: string;
    department: string;
    studentId: number;
    password: string;
    phone: string;
    username: string;
    userRole: string;
    authorities: string[];
    enabled: boolean;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
}

export interface LoginRequest {
    username: string;
    password: string;
    userRole: string;
}

export interface LoginResponse {
    token: string;
}