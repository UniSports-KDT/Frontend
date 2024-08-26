import {FacilityEditRequest, FacilityEditResponse} from "@/types/facility-admin";
import {authenticatedFetch} from "@/api/api-utils";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 6. 시설 수정
export async function editFacility(facilityData: FacilityEditRequest): Promise<FacilityEditResponse> {
    try {
        const response = await authenticatedFetch(`${API_URL}/api/admin/announcements`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(facilityData),
        });
        if (!response.ok) {
            throw new Error('Failed to edit facility');
        }
        return response.json();
    } catch (error) {
        console.error('Failed to create notice:', error);
        throw error;
    }
}