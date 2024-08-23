import { Suspense } from 'react';
import { ReservationFacilityDetailAdmin } from '@/components/reservation/reservation-facility-detail-admin';
import { getFacilityReservations } from '@/api'
import { AllReservation } from "@/types/all-reservation";
import { notFound } from 'next/navigation'

async function FacilityReservationContent({ facilityId }: { facilityId: number }) {
    try {
        const reservations: AllReservation[] = await getFacilityReservations(facilityId);
        if (reservations.length === 0) {
            return <div>이 시설에 대한 예약 내역이 없습니다.</div>;
        }
        return <ReservationFacilityDetailAdmin reservations={reservations} />;
    } catch (error) {
        console.error('Failed to fetch facility reservations:', error);
        return <div>예약 정보를 불러오는 중 오류가 발생했습니다.</div>;
    }
}

export default async function FacilityReservationDetailPage({ params }: { params: { facilityId: string } }) {
    const facilityId = parseInt(params.facilityId);
    if (isNaN(facilityId)) {
        notFound();
    }
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-xl font-bold">로딩 중...</div>}>
            <FacilityReservationContent facilityId={facilityId} />
        </Suspense>
    );
}