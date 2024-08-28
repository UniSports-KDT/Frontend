import { Suspense } from 'react';
import { ReservationAllAdmin } from '@/components/reservation/reservation-all-admin';
import { getAllReservations } from '@/api';
import { AllReservation } from '@/types/all-reservation';

async function ReservationAdminContent() {
    try {
        const allReservations: AllReservation[] = await getAllReservations();
        return <ReservationAllAdmin reservations={allReservations} />
    } catch (error) {
        console.error('Failed to fetch ReservationAdminContent:',error);
    }
}

export default async function ReservationAdminPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-xl font-bold">로딩 중...</div>}>
            <ReservationAdminContent />
        </Suspense>
    );
}