'use client'
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Facility } from '@/types/facility';
import { FacilityImage } from "@/components/facility/facilityImage";

export function FacilityList({ facilities }: { facilities: Facility[] }) {
  return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 py-8 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">시설 보기</h1>
              <p className="text-muted-foreground">원하는 시설을 찾아 예약하세요.</p>
            </div>
            <div className="flex justify-center items-center mb-8">
              <form className="w-full max-w-3xl">
                <div>
                  <Label htmlFor="search">검색</Label>
                  <Input id="search" placeholder="시설 이름 검색" className="w-full"/>
                </div>
              </form>
            </div>
            {facilities && facilities.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {facilities.map((facility) => (
                      <Card key={facility.id} className="flex flex-col">
                        <Link href={`/facility-reservations/${facility.id}`} passHref className="flex-grow">
                          <div className="cursor-pointer h-full flex flex-col">
                            <div className="relative w-full h-40">
                              <FacilityImage
                                  src={facility.imageUrls?.[0]}
                                  alt={facility.name}
                                  className="rounded-t-lg"
                              />
                            </div>
                            <CardContent className="flex-grow flex flex-col justify-between">
                              <div>
                                <h3 className="text-lg font-bold mb-1 mt-2">{facility.name}</h3>
                                <p className="text-muted-foreground mb-4 line-clamp-2">{facility.description}</p>
                                <p className="text-muted-foreground text-sm mb-2">운영 시간: {facility.operatingHours}</p>
                              </div>
                              <div className="flex items-center justify-between mt-auto">
                                <Badge variant="secondary">
                                  {facility.fee === 0 ? '무료' : `요금(1hour): ${facility.fee.toLocaleString()}`}
                                </Badge>
                                <Button variant="outline" size="sm" className="ml-2">
                                  자세히 보기
                                </Button>
                              </div>
                            </CardContent>
                          </div>
                        </Link>
                      </Card>
                  ))}
                </div>
            ) : (
                <div className="flex justify-center items-center h-[50vh]">
                  <p className="text-lg text-muted-foreground">현재 사용 가능한 시설이 없습니다.</p>
                </div>
            )}
          </div>
        </main>
      </div>
  );
}