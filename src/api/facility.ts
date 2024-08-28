import {Facility, FacilityCreateData, FacilityEditData} from '@/types/facility';
import {authenticatedFetch} from "@/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 3. 전체 시설 조회
export async function getFacilities(): Promise<Facility[]> {
    const res = await fetch(`${API_URL}/api/facilities`, {
        cache: "no-store",
        next: { revalidate: 0 }
    });
    if (!res.ok) {
        throw new Error('시설 조회 실패');
    }
    //const facilities: Facility[] = await res.json();
    //return facilities;
    return res.json();
}

// 4. 특정 시설 상세 조회
export async function getFacilityDetails(facilityId: number): Promise<Facility> {
    const res = await fetch(`${API_URL}/api/facilities/${facilityId}`, {
        cache: 'no-store',
        next: { revalidate: 0 }
    });
    if (!res.ok) {
        throw new Error(`${facilityId} 시설 데이터 조회 실패`);
    }
    //const facility: Facility = await res.json();
    //return facility;
    return res.json();
}

//5. 시설 추가
export async function createFacility(facilityData: FacilityCreateData): Promise<{ message: string }> {
    try {
        const response = await authenticatedFetch(`${API_URL}/api/admin/facilities`, {
            method: 'POST',
            body: JSON.stringify(facilityData)
        });
        if (!response.ok) {
            if (response.status === 403) {
                throw new Error('403 Forbidden: 권한이 없습니다.');
            }
            throw new Error('Failed to create facility');
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
        const response = await authenticatedFetch(`${API_URL}/api/admin/facilities/${facilityId}`, {
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
        const response = await authenticatedFetch(`${API_URL}/api/admin/facilities/${facilityId}`, {
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
