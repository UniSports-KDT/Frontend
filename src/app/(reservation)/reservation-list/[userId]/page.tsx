//userId에 따른 예약내역 조회가 가능하도록 수정해야됨!!!!!
import { UserReservationList } from '@/components/reservation/user-reservation-list';
import React from 'react';
import {getReservationLists} from "@/api";
import { Suspense } from 'react';

export async function generateStaticParams() {
    //하드코딩용
    return [
        { userId: '123456' },
    ];
}

export default async function ReservationListPage({ params }: { params: { userId: number } }) {
    const { userId } = params;
    const reservations = await getReservationLists(userId);

    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-xl font-bold">로딩 중...</div>}>
            <UserReservationList reservations={reservations} />
        </Suspense>
    );
}
