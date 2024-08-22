export interface User {
    id: number;
    name: string;
    department: string;
    studentId: string | null;
    password: string;
    phone: string;
    username: string;
    userRole: string;
}

export interface Notice {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    user: User;
}

export interface NoticesProps {
    notices: Notice[];
}