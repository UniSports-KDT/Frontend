import { ReservationList } from '@/components/reservation/reservation-list';
import { Suspense } from 'react';

export default function ReservationListPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-xl font-bold">로딩 중...</div>}>
            <ReservationList />
        </Suspense>
    )
}