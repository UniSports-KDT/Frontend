'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UserReservation } from "@/types/user-reservation";
import { useEffect, useState } from "react";
import { getReservationLists, cancelReservation } from "@/api/reservation";
import { toast } from "@/components/ui/use-toast";

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

    const getStatusColor = (status: UserReservation['status']) => {
        switch(status) {
            case 'PENDING': return 'bg-yellow-100 text-yellow-800';
            case 'APPROVED': return 'bg-green-100 text-green-800';
            case 'REJECTED': return 'bg-red-100 text-red-800';
            case 'CANCELED': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
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
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 py-20 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl font-bold mb-6">예약 내역</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {reservations.length > 0 ? (
                            reservations.map((reservation) => (
                                <Card key={reservation.id} className="bg-background rounded-lg shadow-md">
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="font-medium">
                                                {reservation.facility.name}
                                            </div>
                                            <Badge className={getStatusColor(reservation.status)}>
                                                {getStatusText(reservation.status)}
                                            </Badge>
                                        </div>
                                        <div className="text-sm mb-2">
                                            {reservation.facility.location}
                                        </div>
                                        <div className="text-sm text-muted-foreground mb-2">
                                            {reservation.date}
                                        </div>
                                        <div className="text-sm text-muted-foreground mb-4">
                                            {formatTime(reservation.startTime)} - {formatTime(reservation.endTime)}
                                        </div>
                                        <div className="flex items-center justify-end">
                                            {reservation.status === 'PENDING' && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleCancelReservation(reservation.id)}
                                                >
                                                    취소
                                                </Button>
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
            </main>
        </div>
    );
}