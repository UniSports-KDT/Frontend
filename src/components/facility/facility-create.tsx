'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createFacility } from "@/api";
import { getPresignedUrl, uploadImageToS3 } from "@/lib/imageUrl";
import { useRouter } from "next/navigation"

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
      setFiles(Array.from(event.target.files));
      setAttachmentFlag("Y");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // 이미지 업로드
      const attachmentNames = [];
      for (const file of files) {
        const presignedUrl = await getPresignedUrl(file.name);
        await uploadImageToS3(presignedUrl, file);
        attachmentNames.push(file.name);
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
              <Input id="name" placeholder="시설 이름 입력" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="description">시설 설명</Label>
              <Textarea id="description" rows={3} placeholder="시설 설명 입력" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="location">위치</Label>
              <Input id="location" placeholder="위치 입력" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="hours">운영 시간</Label>
              <div className="grid grid-cols-2 gap-4">
                <Input id="available-hours-start" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                <Input id="available-hours-end" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
              </div>
            </div>
            <div>
              <Label htmlFor="price">요금</Label>
              <Input id="price" type="number" placeholder="요금 입력" value={fee} onChange={(e) => setFee(parseFloat(e.target.value))} />
            </div>
            <div>
              <Label>시설 사진</Label>
              <input type="file" multiple onChange={handleFileChange} />
            </div>
            <div className="flex justify-end">
              <Button type="submit">등록 완료</Button>
            </div>
          </form>
        </main>
      </div>
  );
}
