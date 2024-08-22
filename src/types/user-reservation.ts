export interface UserReservation {
    id: number;
    facilityId: string;
    reservationTime: string;
    status: 'approved' | 'pending' | 'cancelled';
}