'use client'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { FacilityListProps } from "@/types/facility"
import { useRouter } from 'next/navigation'

export function FacilityListAdmin({ facilities }: FacilityListProps) {
    const router = useRouter();

    const handleFacilityClick = (facilityId: number) => {
        router.push(`/reservation-facility-detail-admin/${facilityId}`);
    };

    return (
        <div className="flex flex-col min-h-[100dvh]">
            <main className="flex-1 py-20 px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl font-bold mb-6">시설별 예약 신청내역</h1>
                    <div className="grid gap-4">
                        {facilities.length > 0 ? (
                            facilities.map((facility) => (
                                <Card
                                    key={facility.id}
                                    className="cursor-pointer hover:shadow-md transition-shadow duration-200"
                                    onClick={() => handleFacilityClick(facility.id)}
                                >
                                    <CardHeader>
                                        <CardTitle>{facility.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p><strong>위치:</strong> {facility.location}</p>
                                        <p><strong>운영 시간:</strong> {facility.operatingHours}</p>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <p>등록한 시설이 없습니다.</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}