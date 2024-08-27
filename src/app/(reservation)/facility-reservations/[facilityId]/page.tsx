import { FacilityReservation } from '@/components/reservation/facility-reservation'
import { getFacilityDetails, getAvailableTimes } from '@/api'
import { Suspense } from 'react';
import { Facility } from '@/types/facility'
import { notFound } from 'next/navigation'
import { AuthProvider } from '@/contexts/AuthContext'

interface PageProps {
    params: {
        facilityId: string
    }
}

async function getFacility(facilityId: number): Promise<Facility> {
    try {
        return await getFacilityDetails(facilityId);
    } catch (error) {
        console.error('Failed to fetch facility:', error);
        notFound();
    }
}

async function FacilityReservationContent({ facilityId }: { facilityId: number })  {
    const facility = await getFacility(facilityId);
    const today = new Date().toISOString().split('T')[0];
    const availableTimes = await getAvailableTimes({ facilityId, date: today });
    console.log('Server: Fetched available times:', availableTimes);
    return <FacilityReservation key={today} facility={facility} initialAvailableTimes={availableTimes} />;
}

export default async function FacilityReservationPage({ params }: PageProps) {
    const facilityId = Number(params.facilityId);
    if (isNaN(facilityId)) {
        notFound();
    }

    return (
        <AuthProvider>
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-xl font-bold">로딩 중...</div>}>
                <FacilityReservationContent facilityId={facilityId} />
            </Suspense>
        </AuthProvider>
    );
}