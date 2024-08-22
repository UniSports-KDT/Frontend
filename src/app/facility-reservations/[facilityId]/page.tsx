import { FacilityReservation } from '@/components/facility/facility-reservation'
import { getFacilityDetails } from '@/api'
import { Suspense } from 'react';
import { Facility } from '@/types/facility'

export default async function FacilityReservationPage({ params }: { params: { facilityId: number } }) {
    const facility = await getFacilityDetails(params.facilityId)
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-xl font-bold">로딩 중...</div>}>
            <FacilityReservationContent facility={facility} />
        </Suspense>
    );
}

function FacilityReservationContent({ facility }: { facility: Facility }) {
    return <FacilityReservation facility={facility} />
}