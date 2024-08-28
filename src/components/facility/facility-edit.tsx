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
import { X } from 'lucide-react';

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
              <div className="mt-2 flex items-center justify-center w-full">
                <label htmlFor="dropzone-file"
                       className="flex flex-col items-center justify-center w-full h-30 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                         fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">업로드</span></p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF (최대 800x400px)</p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} multiple/>
                </label>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              {facility.attachmentNames.map((image, index) => (
                  <div key={index} className="relative w-40 h-40">
                    <img
                        src={image}
                        alt={`시설 이미지 ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                        type="button"
                        onClick={() => handleImageDelete(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transform translate-x-1/2 -translate-y-1/2"
                    >
                      <X size={16}/>
                    </button>
                  </div>
              ))}
              {newFiles.map((file, index) => (
                  <div key={`new-${index}`}
                       className="relative w-40 h-40 bg-gray-200 flex items-center justify-center rounded-lg">
                    <span className="text-sm text-gray-600">{file.name}</span>
                  </div>
              ))}
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