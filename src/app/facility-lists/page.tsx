import { FacilityList } from '@/components/component/facility-lists';
import axios from 'axios';

async function getFacilities() {
    try {
        const res = await axios.get('http://3.39.23.4:8080/api/facilities');
        return res.data;
    } catch (error) {
        console.error('Failed to fetch facilities:', error);
        if (axios.isAxiosError(error)) {
            console.error('Axios error response data:', error.response?.data);
        } else {
            console.error('Unexpected error:', error);
        }
        return []; // 빈 배열 반환
    }
}

export default async function FacilityListPage() {
    const facilities = await getFacilities();
    return <FacilityList facilities={facilities} />;
}
export const revalidate = 3600; // 1시간마다 재검증

