'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from 'next/navigation'
import { createNotice } from '@/api'
import { useAuth } from '@/contexts/AuthContext'

export function NoticeWrite() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { userId } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if(!title || !content ) {
      alert('제목과 내용을 모두 입력해주세요.')
      return
    }

    console.log('현재 사용자 ID:', userId);

    if (userId === null) {
      alert('로그인한 사용자의 ID를 확인할 수 없습니다.')
      return
    }

    setIsLoading(true)
    try {
      await createNotice({
        //adminId: 1, // 실제 관리자 ID로 변경해야됨
        adminId: userId,
        title,
        content
      })
      alert('공지사항 작성 완료')
      router.push('/notices-admin')
    } catch (error) {
      console.error('공지사항 작성 중 오류 발생:', error)
      alert('공지사항 작성에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-10 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-8">공지사항 작성</h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="title">제목</Label>
              <Input
                  id="title"
                  placeholder="제목을 입력하세요."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="content">내용</Label>
              <Textarea
                  id="content"
                  rows={8}
                  placeholder="내용을 입력하세요."
                  className="min-h-[400px]"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? '제출 중...' : '제출'}
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}



