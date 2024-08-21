import { Suspense } from 'react';
import { FacilityList } from '@/components/facility/facility-lists';
import { getFacilities } from '@/lib/api';
import { FacilityListProps } from '@/types/facility';

export default async function FacilityListPage() {
    const facilities = await getFacilities();
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-xl font-bold">로딩 중...</div>}>
            <FacilityListContent facilities={facilities} />
        </Suspense>
    );
}

function FacilityListContent({ facilities }: FacilityListProps) {
    return <FacilityList facilities={facilities} />
}
