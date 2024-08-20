'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselItem } from "@/components/ui/carousel"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { ChevronDownIcon } from "lucide-react"
import { useState } from "react";

export function FacilityReservation() {

  // 선택된 날짜를 관리하는 상태를 추가합니다.
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
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="bg-muted py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[2fr_1fr]">
              <div>
                <Carousel className="rounded-xl overflow-hidden">
                  <CarouselItem>
                    <img
                      src="/placeholder.svg"
                      width={800}
                      height={500}
                      alt="시설 이미지"
                      className="object-cover w-full h-[400px] md:h-[500px]"
                      style={{ aspectRatio: "800/500", objectFit: "cover" }}
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <img
                      src="/placeholder.svg"
                      width={800}
                      height={500}
                      alt="시설 이미지"
                      className="object-cover w-full h-[400px] md:h-[500px]"
                      style={{ aspectRatio: "800/500", objectFit: "cover" }}
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <img
                      src="/placeholder.svg"
                      width={800}
                      height={500}
                      alt="시설 이미지"
                      className="object-cover w-full h-[400px] md:h-[500px]"
                      style={{ aspectRatio: "800/500", objectFit: "cover" }}
                    />
                  </CarouselItem>
                </Carousel>
              </div>
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold">농구 코트</h1>
                  <p className="text-muted-foreground">최첨단 농구 코트에서 게임의 흥분을 경험하세요.</p>
                  <div className="mt-4">
                    <h2 className="text-xl font-bold">위치</h2>
                    <p className="text-muted-foreground">
                      메인 스트리트 123번지, 어니타운 USA
                      <Link href="#" className="underline" prefetch={false}>
                        지도 보기
                      </Link>
                    </p>
                  </div>
                  <div className="mt-4">
                    <h2 className="text-xl font-bold">운영 시간</h2>
                    <p className="text-muted-foreground">
                      월요일 - 금요일: 오전 6시 - 오후 10시
                      <br />
                      토요일 - 일요일: 오전 8시 - 오후 8시
                    </p>
                  </div>
                  <div className="mt-4">
                    <h2 className="text-xl font-bold">요금</h2>
                    <p className="text-muted-foreground">
                      회원: 시간당 20달러
                      <br />
                      비회원: 시간당 30달러
                    </p>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold">시설 정보</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>
                      <CheckIcon className="w-5 h-5 mr-2 text-primary" />
                      규격 코트
                    </li>
                    <li>
                      <CheckIcon className="w-5 h-5 mr-2 text-primary" />
                      하드우드 바닥
                    </li>
                    <li>
                      <CheckIcon className="w-5 h-5 mr-2 text-primary" />
                      조절식 골대
                    </li>
                    <li>
                      <CheckIcon className="w-5 h-5 mr-2 text-primary" />
                      관람객을 위한 충분한 좌석
                    </li>
                  </ul>
                </div>  
                <div className="grid gap-2">
                    <Label htmlFor="unavailable-dates">예약 날짜</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="justify-between w-full">
                        <span>{selectedDate ? selectedDate.toLocaleDateString() : "날짜 선택"}</span>
                          <ChevronDownIcon className="w-4 h-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0 max-w-[276px]">
                        <Calendar mode="single" onSelect={handleDateSelect} />
                      </PopoverContent>
                    </Popover>
                  </div>
                <div>
                  <h2 className="text-xl font-bold">예약 가능 시간</h2>
                  <div className="grid grid-cols-2 gap-4 overflow-x-auto">
                    <Button variant="outline">오전 6시 - 오전 8시</Button>
                    <Button variant="outline">오전 8시 - 오전 10시</Button>
                    <Button variant="outline">오전 10시 - 오후 12시</Button>
                    <Button variant="outline">오후 12시 - 오후 2시</Button>
                    <Button variant="outline">오후 2시 - 오후 4시</Button>
                    <Button variant="outline">오후 4시 - 오후 6시</Button>
                    <Button variant="outline">오후 6시 - 오후 8시</Button>
                    <Button variant="outline">오후 8시 - 오후 10시</Button>
                  </div>
                  <p className="mt-2 text-muted-foreground">2시간 단위로 예약 가능</p>
                </div>
                <Button size="lg" className="w-full">
                  지금 예약하기
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* <footer className="bg-primary text-primary-foreground py-6 px-4 md:px-6">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <MountainIcon className="w-6 h-6" />
            <span className="text-lg font-bold">유니스포츠</span>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-muted-foreground">
              유니스포츠는 다양한 스포츠 활동과 편의 시설을 제공하는 프리미엄 스포츠 시설입니다. 555-555-5555번 또는
              info@unisport.com으로 문의해주세요.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="hover:text-accent" prefetch={false}>
                <FacebookIcon className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:text-accent" prefetch={false}>
                <TwitterIcon className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:text-accent" prefetch={false}>
                <InstagramIcon className="w-6 h-6" />
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="#" className="hover:underline" prefetch={false}>
                이용 약관
              </Link>
              <Link href="#" className="hover:underline" prefetch={false}>
                개인정보 보호 정책
              </Link>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  )
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}


function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}


function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}


function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}


function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}
