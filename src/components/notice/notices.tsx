'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { AnnouncementsProps } from '@/types/notice'

export default function Notices({ announcements }: AnnouncementsProps) {
    return (
        <div className="flex flex-col min-h-[100dvh]">
            <main className="flex-1 py-20 px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl font-bold mb-6">공지사항</h1>
                    <div className="grid gap-4">
                        {announcements.length > 0 ? (
                            announcements.map((announcement) => (
                                <Card key={announcement.id}>
                                    <CardHeader>
                                        <CardTitle>{announcement.title}</CardTitle>
                                        <CardDescription>
                                            {new Date(announcement.createdAt).toLocaleDateString()} - {announcement.user.name}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p>{announcement.content}</p>
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

