'use client'
import React, { useState, useEffect } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselItem } from "@/components/ui/carousel"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { ChevronDownIcon } from "lucide-react"
import { Facility } from '@/types/facility'
import { createReservation, getAvailableTimes } from '@/api'
import { AvailableTimesResponse, ReservationRequest, TimeSlot } from '@/types/reservation-available'
import { useAuth } from '@/contexts/AuthContext'
import { format } from 'date-fns'

interface FacilityReservationProps {
  facility: Facility;
  initialAvailableTimes: AvailableTimesResponse;
}

export function FacilityReservation({ facility, initialAvailableTimes }: FacilityReservationProps): JSX.Element {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [availableTimes, setAvailableTimes] = useState<TimeSlot[]>(initialAvailableTimes.availableTimes);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>([]);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    fetchAvailableTimes(selectedDate);
  }, [selectedDate, facility.id]);

  const formatDateForAPI = (date: Date): string => {
    return format(date, 'yyyy-MM-dd');
  };

  const fetchAvailableTimes = async (date: Date) => {
    const formattedDate = formatDateForAPI(date);
    console.log('Fetching available times for date:', formattedDate);
    try {
      const times = await getAvailableTimes({ facilityId: facility.id, date: formattedDate });
      console.log('예약 가능 시간 조회:', times);
      setAvailableTimes(times.availableTimes);
    } catch (error) {
      console.error('Failed to fetch available times:', error);
      alert('예약 가능 시간을 불러오는데 실패했습니다.');
    }
  };

  const handleDateSelect = (date: Date | undefined): void => {
    if (date) {
      console.log('Selected date:', formatDateForAPI(date));
      setSelectedDate(date);
      setSelectedTimeSlots([]);
      fetchAvailableTimes(date);
    }
  };

  const handleTimeSlotSelect = (timeSlot: TimeSlot): void => {
    if (!timeSlot.available) return;
    setSelectedTimeSlots(prev =>
        prev.some(slot => slot.startTime === timeSlot.startTime)
            ? prev.filter(slot => slot.startTime !== timeSlot.startTime)
            : [...prev, timeSlot]
    );
  };

  const handleReservation = async (): Promise<void> => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (selectedTimeSlots.length === 0) {
      alert('예약할 시간을 선택해주세요.')
      return;
    }

    const formattedDate = formatDateForAPI(selectedDate);

    for (const slot of selectedTimeSlots) {
      try {
        const reservationData: ReservationRequest = {
          facilityId: facility.id,
          date: formattedDate,
          startTime: slot.startTime,
          endTime: slot.endTime
        };
        const result = await createReservation(reservationData);
        if (result.success) {
          alert(`${slot.startTime} - ${slot.endTime} 예약 완료`);
          setAvailableTimes(prevTimes =>
              prevTimes.map(t =>
                  t.startTime === slot.startTime ? { ...t, available: false } : t
              )
          );
        } else {
          alert(`${slot.startTime} - ${slot.endTime} 이미 예약된 시간입니다.`);
        }
      } catch (error) {
        console.error('Reservation error:', error);
        alert(`${slot.startTime} - ${slot.endTime} 예약 중 오류가 발생했습니다.`);
      }
    }
    await fetchAvailableTimes(selectedDate);
    setSelectedTimeSlots([]);
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
                                  src={url}  // DB에서 가져온 URL을 직접 사용
                                  width={800}
                                  height={500}
                                  alt={`${facility.name} 이미지 ${index + 1}`}
                                  className="object-cover w-full h-[400px] md:h-[500px]"
                                  style={{ aspectRatio: "800/500", objectFit: "cover" }}
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
                              style={{ aspectRatio: "800/500", objectFit: "cover" }}
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
                  <div className="space-y-8">
                    <div className="grid gap-2 mt-8">
                      <Label htmlFor="unavailable-dates" className="text-xl font-bold">예약 날짜</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="justify-between w-full">
                            <span>{format(selectedDate, 'yyyy-MM-dd')}</span>
                            <ChevronDownIcon className="w-4 h-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 max-w-[276px]">
                          <Calendar mode="single" selected={selectedDate} onSelect={handleDateSelect} />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold mt-8">예약 가능 시간</h2>
                      <div className="grid grid-cols-2 gap-4 overflow-x-auto mt-2">
                        {availableTimes.map((slot) => (
                            <Button
                                key={slot.startTime}
                                variant={selectedTimeSlots.some(s => s.startTime === slot.startTime) ? "default" : "outline"}
                                onClick={() => handleTimeSlotSelect(slot)}
                                disabled={!slot.available}
                                className={!slot.available ? "opacity-25 cursor-not-allowed text-white" : ""}
                            >
                              {`${slot.startTime} - ${slot.endTime}`}
                            </Button>
                        ))}
                      </div>
                    </div>
                    <Button size="lg" className="w-full" onClick={handleReservation}>
                      예약하기
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
