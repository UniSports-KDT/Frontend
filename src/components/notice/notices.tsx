'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { NoticesProps } from '@/types/notice'

export default function Notices({ notices }: NoticesProps) {
    return (
        <div className="flex flex-col min-h-[100dvh]">
            <main className="flex-1 py-20 px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl font-bold mb-6">공지사항</h1>
                    <div className="grid gap-4">
                        {notices.length > 0 ? (
                            notices.map((notice) => (
                                <Card key={notice.id}>
                                    <CardHeader>
                                        <CardTitle>{notice.title}</CardTitle>
                                        <CardDescription>
                                            {new Date(notice.createdAt).toLocaleDateString()} - {notice.user.name}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p>{notice.content}</p>
                                    </CardContent>
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

