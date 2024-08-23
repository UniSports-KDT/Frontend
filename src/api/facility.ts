import { Facility } from '@/types/facility';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

//3.전체 시설 조회
export async function getFacilities(): Promise<Facility[]> {
    if (!API_URL) {
        return fallbackFacilities;
    }
    try {
        const res = await fetch(`${API_URL}/api/facilities`, { next: { revalidate: 3600 } }); // 1시간마다 재검증
        if (!res.ok) {
            throw new Error('Failed to fetch facilities');
        }
        return res.json();
    } catch (error) {
        console.error('Failed to fetch facilities:', error);
        return fallbackFacilities;
    }
}

//4. 특정 시설 상세 조회
export async function getFacilityDetails(facilityId: number): Promise<Facility> {
    if (!API_URL) {
        return fallbackFacilities.find(f => f.id === facilityId) || fallbackFacilities[0];
    }
    try {
        const res = await fetch(`${API_URL}/api/facilities/${facilityId}`, { next: { revalidate: 3600 } }); // 1시간마다 재검증
        if (!res.ok) {
            throw new Error('Failed to fetch facility details');
        }
        return res.json();
    } catch (error) {
        console.error('Failed to fetch facility details:', error);
        return fallbackFacilities.find(f => f.id === facilityId) || fallbackFacilities[0];
    }
}

//하드코딩 데이터
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
