/*
export interface UserReservation {
    id: number;
    facilityId: number;
    reservationTime: string;
    status: 'pending' | 'approved' | 'rejected';
}
*/

export interface UserReservation {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELED';
    facility: {
        id: number;
        name: string;
        location: string;
    };
    user: {
        id: number;
        name: string;
    };
}