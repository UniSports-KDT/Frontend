import axios from 'axios';
import { Notice } from '@/types/notice';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 12. 공지사항 조회
export async function getNotices(): Promise<Notice[]> {
    if (!API_URL) {
        return fallbackNotices;
    }
    try {
        const response = await axios.get<Notice[]>(`${API_URL}/api/announcements`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch notices:', error);
        return fallbackNotices;
    }
}

//하드코딩 데이터
const fallbackNotices: Notice[] = [
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