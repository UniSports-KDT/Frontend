import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function FacilityCreate() {
  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">새로운 시설 등록</h1>
        <form className="space-y-6">
          <div>
            <Label htmlFor="name">시설 이름</Label>
            <Input id="name" placeholder="시설 이름 입력" />
          </div>
          <div>
            <Label htmlFor="description">시설 설명</Label>
            <Textarea id="description" rows={3} placeholder="시설 설명 입력" />
          </div>
          <div>
            <Label htmlFor="location">위치</Label>
            <Input id="location" placeholder="위치 입력" />
          </div>
          <div>
            <Label htmlFor="hours">운영 시간</Label>
            <div className="grid grid-cols-2 gap-4">
              <Input id="available-hours-start" type="time" defaultValue="08:00" />
              <Input id="available-hours-end" type="time" defaultValue="22:00" />
            </div>
          </div>
          <div>
            <Label htmlFor="price">요금</Label>
            <Input id="price" type="number" placeholder="요금 입력" />
          </div>
          <div>
            <Label>시설 사진</Label>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon">
                <PlusIcon className="h-5 w-5" />
                <span className="sr-only">사진 추가</span>
              </Button>
              <div className="flex space-x-2">
                <div className="relative">
                  <img
                    src="/placeholder.svg"
                    alt="Facility image"
                    width={80}
                    height={80}
                    className="rounded"
                    style={{ aspectRatio: "80/80", objectFit: "cover" }}
                  />
                  <Button variant="ghost" size="icon" className="absolute top-1 right-1 text-red-500">
                    <TrashIcon className="h-5 w-5" />
                    <span className="sr-only">삭제</span>
                  </Button>
                </div>
                <div className="relative">
                  <img
                    src="/placeholder.svg"
                    alt="Facility image"
                    width={80}
                    height={80}
                    className="rounded"
                    style={{ aspectRatio: "80/80", objectFit: "cover" }}
                  />
                  <Button variant="ghost" size="icon" className="absolute top-1 right-1 text-red-500">
                    <TrashIcon className="h-5 w-5" />
                    <span className="sr-only">삭제</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">등록 완료</Button>
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}
