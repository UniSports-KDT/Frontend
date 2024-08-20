'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { AnnouncementsProps } from '@/types/announcements'

export function AnnouncementsAdmin({announcements} : AnnouncementsProps) {
  return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 py-20 px-6">
          {/*<main className="flex-1 py-8 px-4 sm:px-6 md:px-8">*/}
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">공지사항</h1>
              <Link href="/announcement-write" className="flex items-center justify-between" prefetch={false}>
                <Button size="sm">
                  <PlusIcon className="h-4 w-4 mr-2"/>
                  공지사항 작성
                </Button>
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {announcements.length > 0 ? (
                  announcements.map((announcement) => (
                      <Card key={announcement.id}>
                        <CardHeader>
                          <CardTitle>{announcement.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>{announcement.content}</p>
                        </CardContent>
                        <CardFooter className="flex items-center justify-between">
                        <span
                            className="text-sm text-muted-foreground">{new Date(announcement.createdAt).toLocaleDateString()}</span>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <FilePenIcon className="h-4 w-4"/>
                              <span className="sr-only">편집</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2Icon className="h-4 w-4"/>
                              <span className="sr-only">삭제</span>
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                  ))) : (
                  <p>공지사항이 없습니다.</p>
              )}
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
