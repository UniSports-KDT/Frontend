//관리자페이지-예약신청목록-시설목록
'use client'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {FacilityListProps} from "@/types/facility";

export function FacilityListAdmin({ facilities }: FacilityListProps) {
    return (
        <div className="flex flex-col min-h-[100dvh]">
            <main className="flex-1 py-20 px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl font-bold mb-6">시설별 예약 신청내역</h1>
                    <div className="grid gap-4">
                        {facilities.length > 0 ? (
                            facilities.map((facility) => (
                                <Card key={facility.id}>
                                    <CardHeader>
                                        <CardTitle>{facility.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p>{facility.location}</p>
                                    </CardContent>
                                </Card>
                            ))) : (
                            <p>등록한 시설이 없습니다.</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}

