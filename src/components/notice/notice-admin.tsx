'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { NoticesProps, Notice } from '@/types/notice'
import { deleteNotice } from '@/api'
import { useState } from 'react'

export function NoticeAdmin({notices: initialNotices} : NoticesProps) {
    const [notices, setNotices] = useState<Notice[]>(initialNotices)

    const handleDelete = async (id: number) => {
        if (window.confirm('이 공지사항을 삭제하시겠습니까?')) {
            try {
                await deleteNotice(id)
                setNotices(notices.filter(notice => notice.id !== id))
                alert('공지사항이 삭제되었습니다.')
            } catch (error) {
                console.error('공지사항 삭제 중 오류 발생:', error)
                if (error instanceof Error && error.message.includes('403')) {
                    alert('삭제할 권한이 없습니다.')
                } else {
                    alert('삭제 실패. 다시 시도해주세요.')
                }
            }
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 py-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold">공지사항</h1>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {notices.length > 0 ? (
                            notices.map((notice) => (
                                <Card key={notice.id} className="flex flex-col">
                                    <CardHeader>
                                        <CardTitle>{notice.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p>{notice.content}</p>
                                    </CardContent>
                                    <CardFooter className="flex items-center justify-between h-16">
                                        <span className="text-sm text-muted-foreground">
                                        {new Date(notice.createdAt).toLocaleDateString()}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <Link href={`/notice-edit/${notice.id}`} passHref>
                                                <Button variant="ghost" size="icon">
                                                    <FilePenIcon className="h-4 w-4"/>
                                                    <span className="sr-only">편집</span>
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(notice.id)}
                                            >
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
        <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10"/>
        <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
        <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z"/>
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
        <path d="M3 6h18"/>
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
        <line x1="10" x2="10" y1="11" y2="17"/>
        <line x1="14" x2="14" y1="11" y2="17"/>
      </svg>
  )
}
