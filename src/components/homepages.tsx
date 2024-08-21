'use client'
import Link from "next/link"
import { HomepageProps } from '@/types/announcements'

export default function Homepage({ announcements }: HomepageProps) {
  const userId = "123456";

  return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 py-12 px-6">
          <section className="max-w-5xl mx-auto space-y-10">
            <div>
              <h1 className="text-4xl font-bold">UniSport에 오신 것을 환영합니다!</h1>
              <p className="text-muted-foreground text-lg">대학교 내 최고의 스포츠 시설을 찾아보고 예약하세요.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-muted rounded-lg p-6 space-y-4">
                <CalendarIcon className="h-8 w-8 text-primary"/>
                <h3 className="text-xl font-bold">시설 예약하기</h3>
                <p className="text-muted-foreground">편리하게 스포츠 시설을 검색하고 예약하세요.</p>
                <Link href="/facility-lists" className="text-primary hover:underline">
                  시설 보기
                </Link>
              </div>
              <div className="bg-muted rounded-lg p-6 space-y-4">
                <BellIcon className="h-8 w-8 text-primary"/>
                <h3 className="text-xl font-bold">최신 소식 확인하기</h3>
                <p className="text-muted-foreground">UniSport의 최신 공지사항과 뉴스를 확인하세요.</p>
                <Link href="/announcements" className="text-primary hover:underline">
                  공지사항 보기
                </Link>
              </div>
              <div className="bg-muted rounded-lg p-6 space-y-4">
                <UserIcon className="h-8 w-8 text-primary"/>
                <h3 className="text-xl font-bold">예약 관리하기</h3>
                <p className="text-muted-foreground">지난 예약 내역과 예정된 예약을 확인하세요.</p>
                <Link href={`/booking-list/${userId}`} className="text-primary hover:underline">
                  예약 내역 보기
                </Link>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">최신 공지사항</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {announcements.slice(0, 3).map((announcement) => (
                    <div key={announcement.id} className="bg-muted rounded-lg p-4 space-y-2">
                      <h3 className="text-lg font-bold">{announcement.title}</h3>
                      <p className="text-muted-foreground">{announcement.content}</p>
                      <Link href={`/announcements/${announcement.id}`} className="text-primary hover:underline">
                        자세히 보기
                      </Link>
                    </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">인기 시설</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted rounded-lg p-4 space-y-2">
                  <img
                      src="/placeholder.svg"
                      alt="체육관"
                      className="rounded-lg object-cover aspect-video"
                      width="300"
                      height="200"
                  />
                  <h3 className="text-lg font-bold">체육관</h3>
                  <p className="text-muted-foreground">최신 장비를 갖춘 우리 체육관에서 운동하세요.</p>
                  <Link href="#" className="text-primary hover:underline">
                    시설 보기
                  </Link>
                </div>
                <div className="bg-muted rounded-lg p-4 space-y-2">
                  <img
                      src="/placeholder.svg"
                      alt="수영장"
                      className="rounded-lg object-cover aspect-video"
                      width="300"
                      height="200"
                  />
                  <h3 className="text-lg font-bold">수영장</h3>
                  <p className="text-muted-foreground">올림픽 규격의 수영장에서 여유롭게 수영하세요.</p>
                  <Link href="#" className="text-primary hover:underline">
                    시설 보기
                  </Link>
                </div>
                <div className="bg-muted rounded-lg p-4 space-y-2">
                  <img
                      src="/placeholder.svg"
                      alt="테니스 코트"
                      className="rounded-lg object-cover aspect-video"
                      width="300"
                      height="200"
                  />
                  <h3 className="text-lg font-bold">테니스 코트</h3>
                  <p className="text-muted-foreground">잘 관리된 테니스 코트에서 즐겁게 테니스를 치세요.</p>
                  <Link href="#" className="text-primary hover:underline">
                    시설 보기
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
  )
}

function BellIcon(props: React.SVGProps<SVGSVGElement>) {
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
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>
  )
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
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
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
      </svg>
  )
}

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
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
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
        </svg>
    )
}
