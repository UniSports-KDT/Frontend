// 개별 시간대
export interface TimeSlot {
    startTime: string;
    endTime: string;
    available: boolean;
}

export interface AvailableTimesResponse {
    facilityId: number;
    date: string;
    availableTimes: TimeSlot[];
}

export interface AvailableTimesRequest {
    facilityId: number;
    date: string;
}

// 예약 요청을 위한 인터페이스
export interface ReservationRequest {
    facilityId: number;
    userId: number;
    date: string;
    startTime: string;
    endTime: string;
}