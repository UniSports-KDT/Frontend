import { FacilityAdmin } from '@/components/facility/facility-admin';
import { Suspense } from 'react';
import { getFacilities } from '@/api';
import { FacilityListProps } from '@/types/facility';

export default async function FacilityAdminPage() {
    const facilities = await getFacilities();
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-xl font-bold">로딩 중...</div>}>
            <FacilityAdminContent facilities={facilities} />
        </Suspense>
    );
}

function FacilityAdminContent({ facilities }: FacilityListProps) {
    return <FacilityAdmin facilities={facilities} />
}