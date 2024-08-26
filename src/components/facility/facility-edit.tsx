'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FacilityEditData, FacilityEditProps } from "@/types/facility";
import { authenticatedFetch } from "@/api/api-utils";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function FacilityEdit({ initialData }: FacilityEditProps) {
  const router = useRouter()

  const [facility, setFacility] = useState<FacilityEditData>(() => {
    //const [startTime, endTime] = initialData.operatingHours.split('-');
    const defaultHours = { start: "09:00", end: "18:00" };
    let [startTime, endTime] = [defaultHours.start, defaultHours.end];

    if (initialData.operatingHours) {
      const parts = initialData.operatingHours.split('-');
      if (parts.length === 2) {
        [startTime, endTime] = parts;
      }
    }
    //------------------------------------------

    return {
      name: initialData.name,
      description: initialData.description,
      location: initialData.location,
      //availableHours: initialData.operatingHours,
      // startTime: startTime || "09:00",
      // endTime: endTime || "18:00",
      availableHours: initialData.operatingHours || `${defaultHours.start}-${defaultHours.end}`,
      startTime,
      endTime,
      fee: initialData.fee,
      attachmentFlag: initialData.attachmentFlag,
      attachmentNames: initialData.imageUrls || [],
    };
  });

  useEffect(() => {
    console.log('Facility Edit Data:', facility);
  }, [facility]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFacility(prev => ({ ...prev, [name]: value }));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFacility(prev => {
      const newFacility = { ...prev, [name]: value };
      newFacility.availableHours = `${newFacility.startTime}-${newFacility.endTime}`;
      return newFacility;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { startTime, endTime, ...submitData } = facility;
      submitData.availableHours = `${startTime}-${endTime}`;

      console.log('Submitting facility data:', submitData);
      const response = await authenticatedFetch(`${API_URL}/api/admin/facilities/${initialData.id}`, {
        method: 'PUT',
        body: JSON.stringify(submitData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '시설 정보 업데이트에 실패했습니다.');
      }
      const updatedFacility = await response.json();
      console.log('Server response:', updatedFacility);

      alert('시설 정보 수정 완료');
      router.refresh();
      router.push('/facility-admin');

    } catch (error) {
      console.error('시설 정보 업데이트 오류:', error);
      alert('시설 정보 업데이트에 실패했습니다.');
    }
  };


  const handleImageAdd = () => {
    setFacility(prev => ({
      ...prev,
      attachmentNames: [...prev.attachmentNames, '/placeholder.svg']
    }));
  };

  const handleImageDelete = (index: number) => {
    setFacility(prev => ({
      ...prev,
      attachmentNames: prev.attachmentNames.filter((_, i) => i !== index)
    }));
  };

  return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-6">시설 정보 수정</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">시설 이름</Label>
              <Input id="name" name="name" value={facility.name} onChange={handleChange} placeholder="시설 이름 입력"/>
            </div>
            <div>
              <Label htmlFor="description">시설 설명</Label>
              <Textarea id="description" name="description" rows={3} value={facility.description}
                        onChange={handleChange} placeholder="시설 설명 입력"/>
            </div>
            <div>
              <Label htmlFor="location">위치</Label>
              <Input id="location" name="location" value={facility.location} onChange={handleChange}
                     placeholder="위치 입력"/>
            </div>
            <div>
              <Label htmlFor="availableHours">운영 시간</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startTime">오전</Label>
                  <Input
                      id="startTime"
                      name="startTime"
                      type="time"
                      value={facility.startTime}
                      onChange={handleTimeChange}
                  />
                </div>
                <div>
                  <Label htmlFor="endTime">오후</Label>
                  <Input
                      id="endTime"
                      name="endTime"
                      type="time"
                      value={facility.endTime}
                      onChange={handleTimeChange}
                  />
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="fee">요금</Label>
              <Input id="fee" name="fee" type="number" value={facility.fee} onChange={handleChange}
                     placeholder="요금 입력"/>
            </div>
            <div>
              <Label>시설 사진</Label>
              <div className="flex items-center space-x-4 mt-2">
                <Button variant="outline" size="icon" type="button" onClick={handleImageAdd}>
                  <PlusIcon className="h-5 w-5"/>
                  <span className="sr-only">사진 추가</span>
                </Button>
                <div className="flex space-x-2">
                  {facility.attachmentNames.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                            src={image}
                            alt={`Facility image ${index + 1}`}
                            width={80}
                            height={80}
                            className="rounded"
                            style={{aspectRatio: "80/80", objectFit: "cover"}}
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-1 right-1 text-red-500"
                            onClick={() => handleImageDelete(index)}
                        >
                          <TrashIcon className="h-5 w-5"/>
                          <span className="sr-only">삭제</span>
                        </Button>
                      </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Button type="submit">수정 완료</Button>
            </div>
          </form>
        </main>
      </div>
  )
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
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
        <path d="M5 12h14"/>
        <path d="M12 5v14"/>
      </svg>
  )
}

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
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
        <path d="M3 6h18"/>
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
      </svg>
  )
}