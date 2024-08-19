import { BookingList } from '@/components/component/booking-list';
import axios from 'axios';
import React from 'react';
import {Booking} from "@/types/booking";

async function getBookingLists(userId: string): Promise<Booking[]> {
    try {
        const res = await axios.get<Booking[]>(`http://3.39.23.4:8080/api/users/${userId}/reservations`);
        return res.data;
    } catch (error) {
        console.error('Failed to fetch booking lists:', error);
        return []; // 빈 배열 반환 또는 에러 처리 로직
    }
}

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
        <BookingList bookings={bookings} />
    );
}
