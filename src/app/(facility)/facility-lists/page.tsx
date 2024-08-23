import { Suspense } from 'react';
import { FacilityList } from '@/components/facility/facility-lists';
import { getFacilities } from '@/api';
import { Facility } from '@/types/facility';

async function FacilityListContent() {
    try {
        const facilities: Facility[] = await getFacilities();
        return <FacilityList facilities={facilities} />;
    } catch (error) {
        console.error('Failed to fetch facility list:', error);
    }
}

export default async function FacilityListPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-xl font-bold">로딩 중...</div>}>
            <FacilityListContent />
        </Suspense>
    );
}
