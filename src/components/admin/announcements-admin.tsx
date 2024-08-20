'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

export function AnnouncementsAdmin() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-8 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">공지사항</h1>
            <Link href="/announcement-write" className="flex items-center justify-between" prefetch={false}>
              <Button size="sm">
                <PlusIcon className="h-4 w-4 mr-2" />
                공지사항 작성
              </Button>
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>시설 보수 안내</CardTitle>
              </CardHeader>
              <CardContent>
                <p>6월 1일부터 6월 15일까지 농구장 보수 작업으로 인해 이용이 제한됩니다.</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">2023-05-15</span>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <FilePenIcon className="h-4 w-4" />
                    <span className="sr-only">편집</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2Icon className="h-4 w-4" />
                    <span className="sr-only">삭제</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>신규 회원권 프로모션</CardTitle>
              </CardHeader>
              <CardContent>
                <p>신규 회원 가입 시 첫 달 20% 할인 혜택을 받으실 수 있습니다.</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">2023-04-30</span>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <FilePenIcon className="h-4 w-4" />
                    <span className="sr-only">편집</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2Icon className="h-4 w-4" />
                    <span className="sr-only">삭제</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>여름 캠프 등록 오픈</CardTitle>
              </CardHeader>
              <CardContent>
                <p>여름 스포츠 캠프 등록이 시작되었습니다. 빨리 등록하세요!</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">2023-03-20</span>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <FilePenIcon className="h-4 w-4" />
                    <span className="sr-only">편집</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2Icon className="h-4 w-4" />
                    <span className="sr-only">삭제</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

function FilePenIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
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


function Trash2Icon(props: React.SVGProps<SVGSVGElement>) {
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
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  )
}
