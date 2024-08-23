//userId에 따른 예약내역 조회가 가능하도록 수정해야됨!!!!!
import { UserReservationList } from '@/components/reservation/user-reservation-list';
import {getReservationLists} from "@/api";
import { Suspense } from 'react';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    //하드코딩용
    return [
        { userId: '123456' },
    ];
}

async function UserReservationContent({ userId }: { userId: number }) {
    try {
        const reservations = await getReservationLists(userId);
        return <UserReservationList reservations={reservations} />;
    } catch (error) {
        console.error('Failed to fetch user reservations:', error);
    }
}

export default async function ReservationListPage({ params }: { params: { userId: string } }) {
    const userId = parseInt(params.userId, 10);
    if (isNaN(userId)) {
        notFound();
    }
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-xl font-bold">로딩 중...</div>}>
            <UserReservationContent userId={userId} />
        </Suspense>
    );
}
