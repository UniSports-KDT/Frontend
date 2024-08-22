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

export interface AllBooking {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
    status: 'APPROVED' | 'REJECTED' | 'PENDING';
    user: User;
    facility: Facility;
}

export interface AllBookingProps {
    allBookings: AllBooking[];
}