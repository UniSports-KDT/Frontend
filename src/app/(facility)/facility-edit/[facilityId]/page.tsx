import { FacilityEdit } from '@/components/facility/facility-edit';
import { getFacilityDetails } from '@/api'
import { Suspense } from 'react';
import { notFound } from 'next/navigation';

interface PageProps {
    params: {
        facilityId: string
    }
}

export default async function FacilityEditPage({ params }: PageProps) {
    const facilityId = Number(params.facilityId);
    if (isNaN(facilityId)) {
        notFound();
    }
    try {
        const facilityDetails = await getFacilityDetails(facilityId);
        if (!facilityDetails) {
            notFound();
        }
        return (
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-xl font-bold">로딩 중...</div>}>
                <FacilityEdit initialData={facilityDetails} />
            </Suspense>
        );
    } catch (error) {
        console.error('시설 정보 가져오기 오류:', error);
        notFound();
    }
}