import { ReservationFacilityDetailAdmin } from '@/components/reservation/reservation-facility-detail-admin';
import { getFacilityReservations } from '@/api'
import { Suspense } from 'react';
import { AllReservation } from "@/types/all-reservation";

export default async function FacilityReservationPage({ params }: { params: { facilityId: string } }) {
    const facilityId = parseInt(params.facilityId);
    const reservations = await getFacilityReservations(facilityId);

    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-xl font-bold">로딩 중...</div>}>
            <FacilityReservationContent reservations={reservations} facilityId={facilityId} />
        </Suspense>
    );
}

function FacilityReservationContent({ reservations, facilityId }: { reservations: AllReservation[]; facilityId: number }) {
    return <ReservationFacilityDetailAdmin reservations={reservations} facilityId={facilityId} />
}