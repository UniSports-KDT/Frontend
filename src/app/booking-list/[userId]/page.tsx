//userId에 따른 예약내역 조회가 가능하도록 수정해야됨!!!!!
import { BookingList } from '@/components/reservation/booking-list';
import React from 'react';
import {getBookingLists} from "@/lib/api";
import { Suspense } from 'react';

export async function generateStaticParams() {
    //하드코딩용
    return [
        { userId: '123456' },
    ];
}

export default async function BookingListPage({ params }: { params: { userId: string } }) {
    const { userId } = params;
    const bookings = await getBookingLists(userId);

    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-xl font-bold">로딩 중...</div>}>
            <BookingList bookings={bookings} />
        </Suspense>
    );
}
