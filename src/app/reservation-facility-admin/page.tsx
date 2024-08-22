import { Suspense } from 'react';
import { FacilityListAdmin } from '@/components/reservation/reservation-facility-admin';
import { getFacilities } from '@/lib/api';
import { FacilityListProps } from '@/types/facility';

export default async function FacilityListAdminPage() {
    const facilities = await getFacilities();
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-xl font-bold">로딩 중...</div>}>
            <FacilityListAdminContent facilities={facilities} />
        </Suspense>
    );
}

function FacilityListAdminContent({ facilities }: FacilityListProps) {
    return <FacilityListAdmin facilities={facilities} />
}