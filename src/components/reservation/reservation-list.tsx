'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UserReservation } from "@/types/user-reservation";
import { useEffect, useState } from "react";
import { getReservationLists, cancelReservation } from "@/api/reservation";
import { toast } from "@/components/ui/use-toast";
import { CalendarIcon, ClockIcon } from 'lucide-react'

const StatusDot = ({ status }: { status: UserReservation['status'] }) => {
    const getStatusColor = (status: UserReservation['status']) => {
        switch(status) {
            case 'PENDING': return '#ffc300';
            case 'APPROVED': return '#2ecc71';
            case 'REJECTED': return '#e74c3c';
            case 'CANCELED': return '#95a5a6';
            default: return '#dcd6d6';
        }
    }
    return (
        <svg width="10" height="10" className="inline mr-2">
            <circle cx="5" cy="5" r="5" fill={getStatusColor(status)} />
        </svg>
    );
}

export function ReservationList() {
    const [reservations, setReservations] = useState<UserReservation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const reservationsData = await getReservationLists();
            setReservations(reservationsData);
        } catch (err) {
            console.error('Failed to fetch data:', err);
            setError('데이터를 불러오는 데 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelReservation = async (reservationId: number) => {
        try {
            const result = await cancelReservation(reservationId);
            if (result.success) {
                toast({
                    title: "예약 취소 성공",
                    description: "예약 취소 완료",
                });
                setReservations(prevReservations =>
                    prevReservations.map(res =>
                        res.id === reservationId ? {...res, status: 'CANCELED'} : res
                    )
                );
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error('Failed to cancel reservation:', error);
            toast({
                title: "예약 취소 실패",
                description: error instanceof Error ? error.message : "예약 취소 중 오류가 발생했습니다.",
                variant: "destructive",
            });
        }
    };

    const getStatusText = (status: UserReservation['status']) => {
        switch(status) {
            case 'PENDING': return '대기 중';
            case 'APPROVED': return '승인됨';
            case 'REJECTED': return '거절됨';
            case 'CANCELED': return '취소됨';
            default: return '알 수 없음';
        }
    };

    const formatTime = (time: string) => {
        return time.slice(0, 5); // "18:00:00" -> "18:00"
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-64">로딩 중...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-64">{error}</div>;
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">예약 내역</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {reservations.length > 0 ? (
                    reservations.map((reservation) => (
                        <Card key={reservation.id} className="overflow-hidden">
                            <CardHeader className="bg-gray-50">
                                <CardTitle className="flex justify-between items-center">
                                    <span>{reservation.facility.name}</span>
                                    <Badge className="flex items-center bg-white text-gray-700 border border-gray-200">
                                        <StatusDot status={reservation.status} />
                                        {getStatusText(reservation.status)}
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="space-y-4">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        <span>{reservation.date}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <ClockIcon className="mr-2 h-4 w-4" />
                                        <span>{formatTime(reservation.startTime)} - {formatTime(reservation.endTime)}</span>
                                    </div>
                                    {reservation.status === 'PENDING' && (
                                        <div className="flex gap-2 mt-4">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1 bg-red-50 text-red-600 hover:bg-red-100"
                                                onClick={() => handleCancelReservation(reservation.id)}
                                            >
                                                취소
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-3 flex justify-center items-center h-64">
                        <p className="text-lg text-muted-foreground">예약 내역이 없습니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
}