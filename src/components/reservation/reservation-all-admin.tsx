'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AllBooking } from '@/types/all-booking';
import { CalendarIcon, ClockIcon } from 'lucide-react'

const StatusDot = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'PENDING': return '#ffc300';
      case 'APPROVED': return '#2ecc71';
      case 'REJECTED': return '#e74c3c';
      default: return '#95a5a6';
    }
  }

  return (
      <svg width="10" height="10" className="inline mr-2">
        <circle cx="5" cy="5" r="5" fill={getStatusColor(status)} />
      </svg>
  );
}

export function ReservationAllAdmin({ allBookings }: { allBookings: AllBooking[] }) {
  const getStatusText = (status: string) => {
    switch(status) {
      case 'PENDING': return '대기 중';
      case 'APPROVED': return '승인됨';
      case 'REJECTED': return '거절됨';
      default: return '알 수 없음';
    }
  }

  return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">예약 관리</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allBookings.map((booking) => (
              <Card key={booking.id} className="overflow-hidden">
                <CardHeader className="bg-gray-50">
                  <CardTitle className="flex justify-between items-center">
                    <span>{booking.facility.name}</span>
                    <Badge className="flex items-center bg-white text-gray-700 border border-gray-200">
                      <StatusDot status={booking.status} />
                      {getStatusText(booking.status)}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <div className="font-medium">{booking.user.name} ({booking.user.studentId})</div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <ClockIcon className="mr-2 h-4 w-4" />
                      <span>{booking.startTime} - {booking.endTime}</span>
                    </div>
                    {booking.status === 'PENDING' && (
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
          ))}
        </div>
      </div>
  )
}