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

export interface Announcement {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    user: User;
}

export interface AnnouncementsProps {
    announcements: Announcement[];
}

export interface HomePageAnnouncement {
    id: number;
    title: string;
    content: string;
}

export interface HomepageProps {
    announcements: HomePageAnnouncement[];
}