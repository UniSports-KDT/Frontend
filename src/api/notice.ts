import { Notice } from '@/types/notice';
import {authenticatedFetch} from "@/api/api-utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 9. 공지사항 작성
export async function createNotice(noticeData: { adminId: number; title: string; content: string }): Promise<Notice> {

    try {
        const response = await authenticatedFetch(`${API_URL}/api/admin/announcements`, {
            method: 'POST',
            body: JSON.stringify(noticeData),
        });
        if (!response.ok) {
            throw new Error('Failed to create notice');
        }
        return response.json();
    } catch (error) {
        console.error('Failed to create notice:', error);
        throw error;
    }
}

// 12. 공지사항 조회
export async function getNotices(): Promise<Notice[]> {
    try {
        const response = await fetch(`${API_URL}/api/announcements`, {
            cache: "no-store"
        });
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error(`status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        return data;
    } catch (error) {
        console.error('Detailed fetch error:', error);
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