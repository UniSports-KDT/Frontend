export interface User {
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

export interface Facility {
    id: number;
    name: string;
    description: string;
    location: string;
    operatingHours: string;
    fee: number;
    attachmentFlag: string;
    createdAt: string;
    updatedAt: string;
    imageUrls: string | null;
}

export interface AllReservation {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
    status: 'APPROVED' | 'REJECTED' | 'PENDING'| 'CANCELD';
    user: User;
    facility: Facility;
}

export interface AllReservationProps {
    allReservations: AllReservation[];
}