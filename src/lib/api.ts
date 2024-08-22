import axios from 'axios';
import { Facility } from '@/types/facility';
import { Notice, HomePageNotice } from '@/types/notice';
import { UserBooking } from '@/types/user-booking';
import { AllBooking} from "@/types/all-booking";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

//3.전체 시설 조회 (SSR)
export async function getFacilities(): Promise<Facility[]> {
    if (!API_URL) {
        //throw new Error('API에러');
        return fallbackFacilities;
    }
    try {
        const res = await axios.get<Facility[]>(`${API_URL}/api/facilities`);
        return res.data;
    } catch (error) {
        console.error('Failed to fetch facilities:', error);
        //throw error;
        return fallbackFacilities;
    }
}

//4. 특정 시설 상세 조회
export async function getFacilityDetails(facilityId: number): Promise<Facility> {
    if (!API_URL) {
        return fallbackFacilities.find(f => f.id === facilityId) || fallbackFacilities[0];
    }
    try {
        const res = await axios.get<Facility>(`${API_URL}/api/facilities/${facilityId}`);
        return res.data;
    } catch (error) {
        console.error('Failed to fetch facility details:', error);
        return fallbackFacilities.find(f => f.id === facilityId) || fallbackFacilities[0];
    }
}

//12. 공지사항 조회
export async function getNotices(isHomePage: boolean = false): Promise<Notice[] | HomePageNotice[]> {
    if (!API_URL) {
        return isHomePage ? fallbackNotices : fallbackNoticesWithUser;
    }
    try {
        const response = await axios.get<Notice[]>(`${API_URL}/api/announcements`);
        if (isHomePage) {
            return response.data.map(({ id, title, content }) => ({ id, title, content }));
        } else {
            return response.data;
        }
    } catch (error) {
        console.error('Failed to fetch notices:', error);
        return isHomePage ? fallbackNotices : fallbackNoticesWithUser;
    }
}

//27. 예약내역 조회 (사용자 기능)
export async function getBookingLists(userId: number): Promise<UserBooking[]> {
    if (!API_URL) {
        return fallbackBookings.map(booking => ({...booking, facilityId: `${booking.facilityId}`}));
    }
    try {
        const res = await axios.get<UserBooking[]>(`${API_URL}/api/users/${userId}/reservations`);
        return res.data;
    } catch (error) {
        console.error('Failed to fetch booking lists:', error);
        return fallbackBookings.map(booking => ({...booking, facilityId: `${booking.facilityId}`}));
    }
}

//29. 전체 예약 불러오기 (관리자 기능)
export async function getAllReservations(): Promise<AllBooking[]> {
    if (!API_URL) {
        return fallbackAllBookings;
    }
    try {
        const res = await axios.get<AllBooking[]>(`${API_URL}/api/reservations`);
        return res.data;
    } catch (error) {
        console.error('Failed to fetch all reservations:', error);
        return fallbackAllBookings;
    }
}


//하드코딩 데이터 모음
const fallbackFacilities: Facility[] = [
    {
        id: 1,
        name: "농구장",
        description: "규격 농구장, 높이 조절 가능한 골대.",
        location: "캠퍼스 A",
        operatingHours: "09:00-18:00",
        fee: 50000,
        attachmentFlag: "Y",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        imageUrls: ["/placeholder.svg"]
    },
    {
        id: 2,
        name: "배구장",
        description: "규격 배구장, 높이 조절 가능한 네트.",
        location: "캠퍼스 B",
        operatingHours: "10:00-20:00",
        fee: 50000,
        attachmentFlag: "N",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        imageUrls: ["/placeholder.svg"]
    },
    {
        id: 3,
        name: "축구장",
        description: "규격 축구장, 인조 잔디 표면.",
        location: "캠퍼스 C",
        operatingHours: "08:00-22:00",
        fee: 50000,
        attachmentFlag: "Y",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        imageUrls: ["/placeholder.svg"]
    },
    {
        id: 4,
        name: "테니스장",
        description: "규격 테니스장, 하드 코트 표면.",
        location: "캠퍼스 A",
        operatingHours: "07:00-21:00",
        fee: 50000,
        attachmentFlag: "N",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        imageUrls: ["/placeholder.svg"]
    }
];

const fallbackNotices: HomePageNotice[] = [
    { id: 1, title: "새로운 체육관 장비 설치", content: "최신 장비를 추가로 설치했습니다. 확인해보세요!" },
    { id: 2, title: "수영장 정기 점검 안내", content: "수영장은 6월 1일부터 15일까지 정기 점검으로 이용이 불가능합니다." },
];

const fallbackNoticesWithUser: Notice[] = [
    {
        id: 1,
        title: "새로운 체육관 장비 설치",
        content: "최신 장비를 추가로 설치했습니다. 확인해보세요!",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        user: {
            id: 1,
            name: "관리자",
            department: "시설관리부",
            studentId: null,
            password: "",
            phone: "",
            username: "admin",
            userRole: "ADMIN"
        }
    },
    {
        id: 2,
        title: "수영장 정기 점검 안내",
        content: "수영장은 6월 1일부터 15일까지 정기 점검으로 이용이 불가능합니다.",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        user: {
            id: 2,
            name: "시설팀장",
            department: "시설관리부",
            studentId: null,
            password: "",
            phone: "",
            username: "facility_manager",
            userRole: "MANAGER"
        }
    },
];

const fallbackBookings: UserBooking[] = [
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

const fallbackAllBookings: AllBooking[] = [
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

