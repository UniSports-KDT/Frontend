import { FacilityAdmin } from '@/components/facility/facility-admin';
import { Suspense } from 'react';
import {getFacilities } from '@/api';
import { Facility } from '@/types/facility';

async function FacilityAdminContent() {
    try {
        const facilities: Facility[] = await getFacilities();
        return <FacilityAdmin facilities={facilities} />
    } catch (error) {
        console.error('Failed to fetch notices:', error);
    }
}

export default async function FacilityAdminPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-xl font-bold">로딩 중...</div>}>
            <FacilityAdminContent />
        </Suspense>
    );
}

