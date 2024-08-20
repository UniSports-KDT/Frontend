import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { AnnouncementsProps } from '@/types/announcements'

export default function Announcements({ announcements }: AnnouncementsProps) {
    return (
        <div className="flex flex-col min-h-[100dvh]">
            <main className="flex-1 py-8 px-4 md:px-6">
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
                                // <p>공지사항이 없습니다.</p>
                                <div className="grid gap-4">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>새로운 시설 오픈</CardTitle>
                                            <CardDescription>2023-04-15</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p>새로운 스포츠 시설 오픈을 알려드립니다! 다음 주부터 예약이 가능합니다.</p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>시설 유지보수</CardTitle>
                                            <CardDescription>2023-03-30</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p>4월 1일부터 4월 15일까지 농구장 폐쇄 예정입니다. 불편을 드려 죄송합니다.</p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>새로운 예약 시스템</CardTitle>
                                            <CardDescription>2023-02-28</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p>
                                                시설 예약이 더 쉽도록 새로운 예약 시스템을 업데이트했습니다. 문의사항이 있으시면 연락주시기 바랍니다.
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}
                    </div>
                </div>
            </main>
        </div>
    )
}

