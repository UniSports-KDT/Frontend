import axios from 'axios';
import { Facility } from '@/types/facility';
import { Announcement, HomePageAnnouncement } from '@/types/announcements';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

//3.전체 시설 조회
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

//12. 전체 공지사항 조회
const testAnnouncements: HomePageAnnouncement[] = [
    { id: 1, title: "새로운 체육관 장비 설치", content: "최신 장비를 추가로 설치했습니다. 확인해보세요!" },
    { id: 2, title: "수영장 정기 점검 안내", content: "수영장은 6월 1일부터 15일까지 정기 점검으로 이용이 불가능합니다." },
];

export async function getAnnouncements(): Promise<HomePageAnnouncement[]> {
    if (!API_URL) {
        return testAnnouncements;
    }

    try {
        const response = await axios.get<Announcement[]>(`${API_URL}/api/announcements`);
        return response.data.map(({ id, title, content }) => ({ id, title, content }));
    } catch (error) {
        console.error('Failed to fetch announcements:', error);
        //throw error;
        return testAnnouncements;
    }
}