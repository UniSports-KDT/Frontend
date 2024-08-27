'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AllReservation } from '@/types/all-reservation';
import { CalendarIcon, ClockIcon } from 'lucide-react'

const StatusDot = ({ status }: { status: string }) => {
    const getStatusColor = (status: string) => {
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

export function ReservationFacilityDetailAdmin({ reservations }: { reservations: AllReservation[] }) {
    const getStatusText = (status: string) => {
        switch(status) {
            case 'PENDING': return '대기 중';
            case 'APPROVED': return '승인';
            case 'REJECTED': return '승인 거부';
            case 'CANCELED': return '사용자 취소';
            default: return '알 수 없음';
        }
    }
    const facilityName = reservations.length > 0 ? reservations[0].facility.name : '';
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">{facilityName} 예약 관리</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {reservations.length > 0 ? (
                    reservations.map((reservation) => (
                        <Card key={reservation.id} className="overflow-hidden h-60">
                            <CardHeader className="bg-gray-50">
                                <CardTitle className="flex justify-between items-center">
                                    <span>{reservation.user.name}</span>
                                    <Badge className="flex items-center bg-white text-gray-700 border border-gray-200">
                                        <StatusDot status={reservation.status} />
                                        {getStatusText(reservation.status)}
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-2">  {/* 여기서 pt-4를 pt-2로 변경하여 여백을 줄임 */}
                                <div className="space-y-4">
                                    <div className="font-medium leading-tight"> {/* leading-tight으로 줄 간격을 좁힘 */}
                                        {reservation.user.department} ({reservation.user.studentId})
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        <span>{reservation.date}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <ClockIcon className="mr-2 h-4 w-4" />
                                        <span>{reservation.startTime} - {reservation.endTime}</span>
                                    </div>
                                    {reservation.status === 'PENDING' && (
                                        <div className="flex gap-2 mt-4">
                                            <Button variant="outline" size="sm" className="flex-1 bg-green-50 text-green-600 hover:bg-green-100">
                                                승인
                                            </Button>
                                            <Button variant="outline" size="sm" className="flex-1 bg-red-50 text-red-600 hover:bg-red-100">
                                                거절
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                    ))
                ) : (
                    <p>예약 신청 내역이 없습니다.</p>
                )}
            </div>
        </div>
    )
}