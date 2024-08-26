import { FacilityReservation } from '@/components/reservation/facility-reservation'
import { getFacilityDetails, getAvailableTimes } from '@/api'
import { Suspense } from 'react';
import { Facility } from '@/types/facility'
import { notFound } from 'next/navigation'

interface PageProps {
    params: {
        facilityId: string
    }
}

//시설 정보 가져옴
async function getFacility(facilityId: number): Promise<Facility> {
    try {
        return await getFacilityDetails(facilityId);
    } catch (error) {
        console.error('Failed to fetch facility:', error);
        notFound();
    }
}

async function FacilityReservationContent({ facilityId, userId }: { facilityId: number, userId: number })  {
    const facility = await getFacility(facilityId);
    const today = new Date().toISOString().split('T')[0];
    const availableTimes = await getAvailableTimes({ facilityId, date: today });
    return <FacilityReservation facility={facility} userId={userId} initialAvailableTimes={availableTimes} />;
}

export default async function FacilityReservationPage({ params }: PageProps) {
    const facilityId = Number(params.facilityId);
    if (isNaN(facilityId)) {
        notFound();
    }
    const UserId = 123456; //userId 하드코딩

    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-xl font-bold">로딩 중...</div>}>
            <FacilityReservationContent facilityId={facilityId} userId={UserId} />
        </Suspense>
    );
}