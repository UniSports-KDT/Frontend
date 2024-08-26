'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Notice } from '@/types/notice'
import { getNoticeById, updateNotice } from '@/api'

interface NoticeEditProps {
    id: string;
}

export default function NoticeEdit({ id }: NoticeEditProps) {
    const router = useRouter()
    const [notice, setNotice] = useState<Notice | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchNotice() {
            try {
                const fetchedNotice = await getNoticeById(parseInt(id))
                setNotice(fetchedNotice || null)
            } catch (error) {
                console.error('Failed to fetch notice:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchNotice()
    }, [id])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!notice) return

        try {
            await updateNotice(notice.id, {
                adminId: notice.user.id,
                title: notice.title,
                content: notice.content
            })
            alert('수정 완료')
            router.push('/notices-admin')
        } catch (error) {
            console.error('Failed to update notice:', error)
            alert('공지사항 업데이트에 실패했습니다.')
        }
    }

    if (isLoading) return <div>로딩 중...</div>
    if (!notice) return <div>공지사항을 찾을 수 없습니다.</div>

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 py-20 px-6">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-2xl font-bold mb-6">공지사항 수정</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">제목</label>
                            <Input
                                id="title"
                                value={notice.title}
                                onChange={(e) => setNotice({ ...notice, title: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700">내용</label>
                            <Textarea
                                id="content"
                                value={notice.content}
                                onChange={(e) => setNotice({ ...notice, content: e.target.value })}
                                required
                                rows={10}
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={() => router.back()}>취소</Button>
                            <Button type="submit">수정</Button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}