'use client'
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FacilityEditData, FacilityEditProps } from "@/types/facility";
import { editFacility } from "@/api";
import { getPresignedUrl, uploadImageToS3 } from "@/lib/imageUrl";

export function FacilityEdit({ initialData }: FacilityEditProps) {
  const router = useRouter();
  const [facility, setFacility] = useState<FacilityEditData>(() => {
    const defaultHours = { start: "09:00", end: "18:00" };
    let [startTime, endTime] = [defaultHours.start, defaultHours.end];

    if (initialData.operatingHours) {
      const parts = initialData.operatingHours.split('-');
      if (parts.length === 2) {
        [startTime, endTime] = parts;
      }
    }

    return {
      name: initialData.name,
      description: initialData.description,
      location: initialData.location,
      availableHours: initialData.operatingHours || `${defaultHours.start}-${defaultHours.end}`,
      startTime,
      endTime,
      fee: initialData.fee,
      attachmentFlag: initialData.attachmentFlag,
      attachmentNames: initialData.imageUrls || [],
    };
  });

  const [newFiles, setNewFiles] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFacility(prev => ({ ...prev, [name]: value } as FacilityEditData));  // as FacilityEditData 추가
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFacility(prev => {
      const newFacility = { ...prev, [name]: value } as FacilityEditData; // as FacilityEditData 추가
      newFacility.availableHours = `${newFacility.startTime}-${newFacility.endTime}`;
      return newFacility;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // 이미지 업로드 처리
      const attachmentNames = [...facility.attachmentNames];

      for (const file of newFiles) {
        const presignedUrl = await getPresignedUrl(file.name);
        await uploadImageToS3(presignedUrl, file);
        attachmentNames.push(file.name);
      }

      const submitData: FacilityEditData = {
        ...facility,
        availableHours: `${facility.startTime}-${facility.endTime}`,
        attachmentNames,
      };

      await editFacility(initialData.id, submitData);

      alert('시설 정보 수정 완료');
      router.refresh();
      router.push('/facility-admin');

    } catch (error) {
      console.error('시설 정보 업데이트 오류:', error);
      alert('시설 정보 업데이트에 실패했습니다.');
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFilesArray = Array.from(event.target.files);
      setNewFiles(prev => [...prev, ...newFilesArray]);
      setFacility(prev => ({
        ...prev,
        attachmentFlag: "Y",
      } as FacilityEditData)); // as FacilityEditData 추가
    }
  };

  const handleImageDelete = (index: number) => {
    setFacility(prev => ({
      ...prev,
      attachmentNames: prev.attachmentNames.filter((_, i) => i !== index),
    } as FacilityEditData)); // as FacilityEditData 추가
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
              <input type="file" multiple onChange={handleFileChange} />
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex space-x-2">
                  {facility.attachmentNames.map((image, index) => (
                      <div key={index} className="relative">
                        {typeof image === 'string' ? (
                            <img
                                src={image}
                                alt={`Facility image ${index + 1}`}
                                width={80}
                                height={80}
                                className="rounded"
                                style={{ aspectRatio: "80/80", objectFit: "cover" }}
                            />
                        ) : (
                            <div className="h-20 w-20 rounded bg-gray-200 flex items-center justify-center">
                              <span>{(image as File).name}</span>
                            </div>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-1 right-1 text-red-500"
                            onClick={() => handleImageDelete(index)}
                        >
                          <TrashIcon className="h-5 w-5" />
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
  );
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