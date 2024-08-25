export interface UserRegistrationRequest {
    name: string;
    username: string;
    password: string;
    phone: string;
    department: string;
    studentId: string;
    userRole: 'GENERAL' | 'ADMIN';
}

export interface UserRegistrationResponse {
    id: number;
    name: string;
    department: string;
    studentId: string;
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
}

export interface LoginResponse {
    token: string;
    username: string;
}

//유저 프로필 조회
// export interface UserProfile {
//     id: number;
//     name: string;
//     department: string;
//     phone: string;
//     studentId: string;
//     password: string;
// }