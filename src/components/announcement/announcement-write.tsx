import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function AnnouncementWrite() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-10 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-8">공지사항 작성</h1>
          <form className="space-y-6">
            <div>
              <Label htmlFor="title">제목</Label>
              <Input id="title" placeholder="제목을 입력하세요." />
            </div>
            <div>
              <Label htmlFor="content">내용</Label>
              <Textarea id="content" rows={8} placeholder="내용을 입력하세요." className="min-h-[400px]" />
            </div>
            <Button type="submit" className="w-full">
              제출
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}



