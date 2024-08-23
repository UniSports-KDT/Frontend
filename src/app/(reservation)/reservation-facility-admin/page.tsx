import { Suspense } from 'react';
import { FacilityListAdmin } from '@/components/reservation/reservation-facility-admin';
import { getFacilities } from '@/api';
import { Facility } from '@/types/facility';

async function FacilityListAdminContent() {
    try {
        const facilities: Facility[] = await getFacilities();
        return <FacilityListAdmin facilities={facilities} />
    } catch (error) {
        console.log('Failed to fetch facility list:', error);
    }
}

export default async function FacilityListAdminPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-xl font-bold">로딩 중...</div>}>
            <FacilityListAdminContent />
        </Suspense>
    );
}