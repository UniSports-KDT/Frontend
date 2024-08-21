'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselItem } from "@/components/ui/carousel"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { ChevronDownIcon } from "lucide-react"
import { useState } from 'react'
import { Facility } from '@/types/facility'

export function FacilityReservation({ facility }: { facility: Facility }) {

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 날짜 선택 시 호출되는 함수
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date || null); // undefined일 경우 null로 설정
    console.log("선택된 날짜:", date); // 콘솔에 선택된 날짜를 출력합니다.
    console.log(date?.getDate())
    console.log(date?.getFullYear())
    console.log(date?.getMonth())
  };

  return (
      <div className="flex flex-col min-h-screen items-center">
        <main className="flex-1 w-full">
          <section className="py-12 md:py-14 lg:py-15 w-full">
            <div className="container px-4 md:px-6 max-w-5xl mx-auto">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="md:pr-8">
                  <Carousel className="rounded-xl overflow-hidden">
                    {facility.imageUrls && facility.imageUrls.length > 0 ? (
                        facility.imageUrls.map((url, index) => (
                            <CarouselItem key={index}>
                              <img
                                  src={url}
                                  width={800}
                                  height={500}
                                  alt={`${facility.name} 이미지 ${index + 1}`}
                                  className="object-cover w-full h-[400px] md:h-[500px]"
                                  style={{aspectRatio: "800/500", objectFit: "cover"}}
                              />
                            </CarouselItem>
                        ))
                    ) : (
                        <CarouselItem>
                          <img
                              src="/placeholder.svg"
                              width={800}
                              height={500}
                              alt="시설 이미지 없음"
                              className="object-cover w-full h-[400px] md:h-[500px]"
                              style={{aspectRatio: "800/500", objectFit: "cover"}}
                          />
                        </CarouselItem>
                    )}
                  </Carousel>
                </div>
                <div>
                  <div className="space-y-6 mb-6">
                    <div>
                      <h1 className="text-3xl font-bold text-center">{facility.name}</h1>
                      <p className="text-muted-foreground text-center mt-2 font-semibold">{facility.description}</p>
                      <div className="mt-4">
                        <h2 className="text-xl font-bold">위치</h2>
                        <p className="text-muted-foreground">
                          {facility.location}
                          <Link href="#" className="underline ml-2" prefetch={false}>
                            지도 보기
                          </Link>
                        </p>
                      </div>
                      <div className="mt-8">
                        <h2 className="text-xl font-bold">운영 시간</h2>
                        <p className="text-muted-foreground">{facility.operatingHours}</p>
                      </div>
                      <div className="mt-8">
                        <h2 className="text-xl font-bold">요금</h2>
                        <div className="flex items-center justify-start text-muted-foreground">
                          <p>
                            {facility.fee === 0 ? '무료' : `1hour: ${facility.fee}원`}
                          </p>
                          <p className="ml-5 text-sm">※ 2시간 단위로 예약 가능</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*<div className="mb-8">*/}
                  {/*  <h2 className="text-xl font-bold mb-2">시설 정보</h2>*/}
                  {/*  <ul className="space-y-1 text-muted-foreground">*/}
                  {/*    <li className="flex items-center">*/}
                  {/*      <CheckIcon className="w-5 h-5 mr-2 text-primary flex-shrink-0"/>*/}
                  {/*      <span>규격 코트</span>*/}
                  {/*    </li>*/}
                  {/*    <li className="flex items-center">*/}
                  {/*      <CheckIcon className="w-5 h-5 mr-2 text-primary flex-shrink-0"/>*/}
                  {/*      <span>하드우드 바닥</span>*/}
                  {/*    </li>*/}
                  {/*    <li className="flex items-center">*/}
                  {/*      <CheckIcon className="w-5 h-5 mr-2 text-primary flex-shrink-0"/>*/}
                  {/*      <span>조절식 골대</span>*/}
                  {/*    </li>*/}
                  {/*    <li className="flex items-center">*/}
                  {/*      <CheckIcon className="w-5 h-5 mr-2 text-primary flex-shrink-0"/>*/}
                  {/*      <span>관람객을 위한 충분한 좌석</span>*/}
                  {/*    </li>*/}
                  {/*  </ul>*/}
                  {/*</div>*/}
                  <div className="space-y-8">
                    <div className="grid gap-2 mt-8">
                    <Label htmlFor="unavailable-dates" className="text-xl font-bold">예약 날짜</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="justify-between w-full">
                            <span>{selectedDate ? selectedDate.toLocaleDateString() : "날짜 선택"}</span>
                            <ChevronDownIcon className="w-4 h-4"/>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 max-w-[276px]">
                          <Calendar mode="single" onSelect={handleDateSelect}/>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold mt-8">예약 가능 시간</h2>
                      <div className="grid grid-cols-2 gap-4 overflow-x-auto mt-2">
                        <Button variant="outline">오전 6시 - 오전 8시</Button>
                        <Button variant="outline">오전 8시 - 오전 10시</Button>
                        <Button variant="outline">오전 10시 - 오후 12시</Button>
                        <Button variant="outline">오후 12시 - 오후 2시</Button>
                        <Button variant="outline">오후 2시 - 오후 4시</Button>
                        <Button variant="outline">오후 4시 - 오후 6시</Button>
                        <Button variant="outline">오후 6시 - 오후 8시</Button>
                        <Button variant="outline">오후 8시 - 오후 10시</Button>
                      </div>
                    </div>
                    <Button size="lg" className="w-full">
                      지금 예약하기
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
        <path d="M20 6 9 17l-5-5"/>
      </svg>
  )
}
