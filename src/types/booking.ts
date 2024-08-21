export interface Booking {
    id: number;
    facilityId: string;
    reservationTime: string;
    status: 'approved' | 'pending' | 'cancelled';
}