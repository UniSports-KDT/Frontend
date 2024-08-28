import {Facility, FacilityCreateData, FacilityEditData} from '@/types/facility';
import {authenticatedFetch} from "@/api/api-utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 3. 전체 시설 조회
export async function getFacilities(): Promise<Facility[]> {
    try {
        const res = await fetch(`/api/facilities`, {
            cache: "no-store",
            next: { revalidate: 0 }
        });
        if (!res.ok) {
            throw new Error('Failed to fetch facilities');
        }
        const facilities: Facility[] = await res.json();
        return facilities;
    } catch (error) {
        console.error('Failed to fetch facilities:', error);
        return fallbackFacilities;
    }
}

// 4. 특정 시설 상세 조회
export async function getFacilityDetails(facilityId: number): Promise<Facility> {
    try {
        const res = await fetch(`/api/facilities/${facilityId}`, {
            cache: 'no-store',
            next: { revalidate: 0 }
        });
        if (!res.ok) {
            throw new Error('Failed to fetch facility details');
        }
        const facility: Facility = await res.json();
        return facility;
    } catch (error) {
        console.error('Failed to fetch facility details:', error);
        return fallbackFacilities.find(f => f.id === facilityId) || fallbackFacilities[0];
    }
}

/////////////////////////////////////////////////////////////////////
//5. 시설 추가
export async function createFacility(facilityData: FacilityCreateData): Promise<{ message: string }> {
    try {
        const response = await authenticatedFetch(`/api/admin/facilities`, {
            method: 'POST',
            body: JSON.stringify(facilityData)
        });
        if (!response.ok) {
            if (response.status === 403) {
                throw new Error('403 Forbidden: 권한이 없습니다.');
            }
            throw new Error('Failed to delete facility');
        }
        return response.json();
    } catch(error) {
        console.error('Failed to delete facility:', error);
        throw error;
    }
}

//6. 시설 수정
export async function editFacility(facilityId: number, facilityData: FacilityEditData): Promise<{ message: string }> {
    try {
        const response = await authenticatedFetch(`/api/admin/facilities/${facilityId}`, {
            method: 'PUT',
            body: JSON.stringify(facilityData),
        });
        if (!response.ok) {
            if (response.status === 403) {
                throw new Error('403 Forbidden: 권한이 없습니다.');
            }
            throw new Error('Failed to delete facility');
        }
        return response.json();
    } catch(error) {
        console.error('Failed to delete facility:', error);
        throw error;
    }
}

//7. 시설 삭제
export async function deleteFacility(facilityId: number): Promise<{ message: string }> {
    try {
        const response = await authenticatedFetch(`/api/admin/facilities/${facilityId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            if (response.status === 403) {
                throw new Error('403 Forbidden: 권한이 없습니다.');
            }
            throw new Error('Failed to delete facility');
        }
        return response.json();
    } catch(error) {
        console.error('Failed to delete facility:', error);
        throw error;
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
