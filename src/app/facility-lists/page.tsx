import { Suspense } from 'react';
import { FacilityList } from '@/components/facility/facility-lists';
import { getFacilities } from '@/lib/api';

export default async function FacilityListPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">로딩 중...</div>}>
            <FacilityListContent />
        </Suspense>
    );
}

async function FacilityListContent() {
    const facilities = await getFacilities();
    return <FacilityList facilities={facilities} />;
}

export const revalidate = 3600; // 1시간마다 재검증

