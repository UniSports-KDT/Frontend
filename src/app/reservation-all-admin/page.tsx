import { Suspense } from 'react';
import { ReservationAllAdmin } from '@/components/reservation/reservation-all-admin';
import { getAllReservations } from '@/api';
import { AllBooking } from '@/types/all-booking';

export default async function ReservationAdminPage() {
    const allBookings = await getAllReservations();
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-xl font-bold">로딩 중...</div>}>
            <ReservationAdminContent allBookings={allBookings} />
        </Suspense>
    );
}

function ReservationAdminContent({ allBookings }: { allBookings: AllBooking[] }) {
    return <ReservationAllAdmin allBookings={allBookings} />
}