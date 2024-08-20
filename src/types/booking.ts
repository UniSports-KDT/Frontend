export interface Booking {
    id: string;
    facilityId: string;
    reservationTime: string;
    status: 'approved' | 'pending' | 'cancelled';
}