import axios from 'axios';
import { UserReservation } from '@/types/user-reservation';
import { AllReservation } from "@/types/all-reservation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

//27. 예약내역 조회 (사용자 기능)
export async function getReservationLists(userId: number): Promise<UserReservation[]> {
    if (!API_URL) {
        return fallbackReservations.map(reservation => ({...reservation, facilityId: `${reservation.facilityId}`}));
    }
    try {
        const res = await axios.get<UserReservation[]>(`${API_URL}/api/users/${userId}/reservations`);
        return res.data;
    } catch (error) {
        console.error('Failed to fetch reservation lists:', error);
        return fallbackReservations.map(reservation => ({...reservation, facilityId: `${reservation.facilityId}`}));
    }
}

//29. 전체 예약 불러오기 (관리자 기능)
export async function getAllReservations(): Promise<AllReservation[]> {
    if (!API_URL) {
        return fallbackAllReservations;
    }
    try {
        const res = await axios.get<AllReservation[]>(`${API_URL}/api/reservations`);
        return res.data;
    } catch (error) {
        console.error('Failed to fetch all reservations:', error);
        return fallbackAllReservations;
    }
}

//하드코딩 데이터
const fallbackReservations: UserReservation[] = [
    {
        id: 1,
        facilityId: "농구장",
        reservationTime: "2024-08-25T10:00:00Z",
        status: 'approved'
    },
    {
        id: 2,
        facilityId: "테니스장",
        reservationTime: "2024-08-26T14:00:00Z",
        status: 'pending'
    },
    {
        id: 3,
        facilityId: "수영장",
        reservationTime: "2024-08-27T09:00:00Z",
        status: 'cancelled'
    }
];

const fallbackAllReservations: AllReservation[] = [
    {
        id: 1,
        date: '2023-08-25',
        startTime: '10:00',
        endTime: '12:00',
        status: 'APPROVED',
        user: {
            id: 1,
            name: '김철수',
            department: '컴퓨터공학과',
            studentId: '20230001',
            password: 'hashed_password',
            phone: '010-1234-5678',
            username: 'chulsoo.kim',
            userRole: 'STUDENT'
        },
        facility: {
            id: 1,
            name: '농구장',
            description: '실내 농구장',
            location: '체육관 1층',
            operatingHours: '09:00-18:00',
            fee: 10000,
            attachmentFlag: 'Y',
            createdAt: '2023-01-01T00:00:00Z',
            updatedAt: '2023-01-01T00:00:00Z',
            imageUrls: '/images/basketball_court.jpg'
        }
    },
    {
        id: 2,
        date: '2023-08-26',
        startTime: '14:00',
        endTime: '16:00',
        status: 'PENDING',
        user: {
            id: 2,
            name: '이영희',
            department: '경영학과',
            studentId: '20230002',
            password: 'hashed_password',
            phone: '010-2345-6789',
            username: 'younghee.lee',
            userRole: 'STUDENT'
        },
        facility: {
            id: 2,
            name: '테니스장',
            description: '야외 테니스장',
            location: '운동장 옆',
            operatingHours: '08:00-20:00',
            fee: 15000,
            attachmentFlag: 'N',
            createdAt: '2023-01-02T00:00:00Z',
            updatedAt: '2023-01-02T00:00:00Z',
            imageUrls: '/images/tennis_court.jpg'
        }
    },
    {
        id: 3,
        date: '2023-08-27',
        startTime: '09:00',
        endTime: '11:00',
        status: 'REJECTED',
        user: {
            id: 3,
            name: '박민수',
            department: '체육교육과',
            studentId: '20230003',
            password: 'hashed_password',
            phone: '010-3456-7890',
            username: 'minsoo.park',
            userRole: 'STUDENT'
        },
        facility: {
            id: 3,
            name: '수영장',
            description: '25m 실내 수영장',
            location: '체육관 지하 1층',
            operatingHours: '06:00-22:00',
            fee: 8000,
            attachmentFlag: 'Y',
            createdAt: '2023-01-03T00:00:00Z',
            updatedAt: '2023-01-03T00:00:00Z',
            imageUrls: '/images/swimming_pool.jpg'
        }
    }
];