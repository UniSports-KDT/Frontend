import { Suspense } from 'react';
import { ReservationAllAdmin } from '@/components/reservation/reservation-all-admin';
import { getAllReservations } from '@/api';
import { AllReservationProps } from '@/types/all-reservation';

export default async function ReservationAdminPage() {
    const allReservations = await getAllReservations();
    console.log('Server-side allReservations:', allReservations); // 로그 추가
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-xl font-bold">로딩 중...</div>}>
            <ReservationAdminContent allReservations={allReservations} />
        </Suspense>
    );
}

function ReservationAdminContent({ allReservations }: AllReservationProps) {
    return <ReservationAllAdmin allReservations={allReservations} />
}