//사용자가 예약한 내역 보기
'use client'
import { Button } from "@/components/ui/button"
import {UserReservation} from "@/types/user-reservation";

export function UserReservationList({ reservations }: { reservations: UserReservation[] }) {
  return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 py-20 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">예약 내역</h1>
            <div className="space-y-4">
              {reservations.length > 0 ? (
                  reservations.map((reservation) => (
                      <div key={reservation.id} className="bg-background rounded-lg shadow-md p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">{reservation.facilityId}</div>
                          <div className="text-sm text-muted-foreground">{new Date(reservation.reservationTime).toLocaleDateString()}에 예약됨</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            예약 상태:{' '}
                            <span
                                className={`font-medium ${
                                    reservation.status === 'approved'
                                        ? 'text-green-500'
                                        : reservation.status === 'pending'
                                            ? 'text-yellow-500'
                                            : 'text-red-500'
                                }`}
                            >
                        {reservation.status === 'approved'
                            ? '확정'
                            : reservation.status === 'pending'
                                ? '대기 중'
                                : '취소됨'}
                        </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              상세 보기
                            </Button>
                            {reservation.status === 'pending' && (
                                <Button variant="outline" size="sm">
                                  취소
                                </Button>
                            )}
                          </div>
                        </div>
                      </div>
                  ))
              ) : (
                  <div className="flex justify-center items-center h-64">
                      <p className="text-lg text-muted-foreground">예약 내역이 없습니다.</p>
                  </div>
              )}
            </div>
          </div>
        </main>
      </div>
  )
}
