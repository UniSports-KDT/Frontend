'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createFacility } from "@/api";
import { getPresignedUrl, uploadImageToS3 } from "@/lib/imageUrl";
import { useRouter } from "next/navigation"
import { X } from 'lucide-react';

export function FacilityCreate() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [startTime, setStartTime] = useState("08:00")
  const [endTime, setEndTime] = useState("22:00")
  const [fee, setFee] = useState(0)
  const [attachmentFlag, setAttachmentFlag] = useState("N")
  const [files, setFiles] = useState<File[]>([])
  const router = useRouter()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
      setAttachmentFlag("Y");
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    if (files.length === 1) {
      setAttachmentFlag("N");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // 이미지 업로드
      const attachmentNames = [];
      for (const file of files) {
        try {
          const presignedUrl = await getPresignedUrl(file.name);
          await uploadImageToS3(presignedUrl, file);
          attachmentNames.push(file.name);
        } catch (error) {
          console.error(`Error processing file ${file.name}:`, error);
          throw new Error(`파일 처리 중 에러남`);
        }
      }

      const facilityData = {
        name,
        description,
        location,
        availableHours: `${startTime}-${endTime}`,
        fee,
        attachmentFlag,
        attachmentNames,
      };
      await createFacility(facilityData);

      alert('시설 등록 완료');
      router.push('/admin');

    } catch (error) {
      console.error("Failed to create facility:", error);
    }
  };

  return (
      <div className="flex flex-col h-screen">
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-6">새로운 시설 등록</h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name">시설 이름</Label>
              <Input id="name" placeholder="시설 이름 입력" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div>
              <Label htmlFor="description">시설 설명</Label>
              <Textarea id="description" rows={3} placeholder="시설 설명 입력" value={description}
                        onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <div>
              <Label htmlFor="location">위치</Label>
              <Input id="location" placeholder="위치 입력" value={location} onChange={(e) => setLocation(e.target.value)}/>
            </div>
            <div>
              <Label htmlFor="hours">운영 시간</Label>
              <div className="grid grid-cols-2 gap-4">
                <Input id="available-hours-start" type="time" value={startTime}
                       onChange={(e) => setStartTime(e.target.value)}/>
                <Input id="available-hours-end" type="time" value={endTime}
                       onChange={(e) => setEndTime(e.target.value)}/>
              </div>
            </div>
            <div>
              <Label htmlFor="price">요금</Label>
              <Input id="price" type="number" placeholder="요금 입력" value={fee}
                     onChange={(e) => setFee(parseFloat(e.target.value))}/>
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
              {files.map((file, index) => (
                  <div key={index} className="relative w-40 h-40">
                    <img
                        src={URL.createObjectURL(file)}
                        alt={`업로드된 이미지 ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transform translate-x-1/2 -translate-y-1/2"
                    >
                      <X size={16}/>
                    </button>
                  </div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button type="submit" className="w-full max-w-md py-6 text-md">등록완료</Button>
            </div>
          </form>
        </main>
      </div>
  );
}