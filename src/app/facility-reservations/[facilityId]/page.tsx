// import { FacilityReservation } from '@/components/facility/facility-reservation'
// import { getFacilities } from '@/lib/api'
//
// export default function FacilityReservationPage({ params }: { params: { facilityId: string } }) {
//     return <FacilityReservation facilityId={params.facilityId} />
// }
//
// export async function generateStaticParams() {
//     const facilities = await getFacilities()
//     return facilities.map((facility) => ({
//         facilityId: facility.id.toString(),
//     }))
// }

import { FacilityReservation } from '@/components/facility/facility-reservation'
import { getFacilityDetails } from '@/lib/api'
import { Suspense } from 'react';
import { Facility } from '@/types/facility'

export default async function FacilityReservationPage({ params }: { params: { facilityId: string } }) {
    const facility = await getFacilityDetails(Number(params.facilityId)) //오류나서 Number로 매핑함
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-xl font-bold">로딩 중...</div>}>
            <FacilityReservationContent facility={facility} />
        </Suspense>
    );
}

function FacilityReservationContent({ facility }: { facility: Facility }) {
    return <FacilityReservation facility={facility} />
}