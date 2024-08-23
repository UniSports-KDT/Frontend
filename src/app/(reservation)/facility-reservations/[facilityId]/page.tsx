import { FacilityReservation } from '@/components/reservation/facility-reservation'
import { getFacilityDetails } from '@/api'
import { Suspense } from 'react';
import { Facility } from '@/types/facility'
import { notFound } from 'next/navigation'

interface PageProps {
    params: {
        facilityId: string
    }
}

async function FacilityReservationContent({ facilityId }: { facilityId: number })  {
    try {
        const facility: Facility = await getFacilityDetails(facilityId);
        return <FacilityReservation facility={facility} />
    } catch (error) {
        console.error('Failed to fetch facilities:', error);
        notFound();
    }
}

export default async function FacilityReservationPage({ params }: PageProps) {
    const facilityId = Number(params.facilityId);

    if (isNaN(facilityId)) {
        notFound();
    }

    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-xl font-bold">로딩 중...</div>}>
            <FacilityReservationContent facilityId={facilityId} />
        </Suspense>
    );
}