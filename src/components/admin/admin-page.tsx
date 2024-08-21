import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function AdminPage() {
  return (
      <div className="flex flex-col min-h-[100dvh]">
        <main className="flex-1 px-4 md:px-6">
          <section className="md:py-10">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">관리자 페이지</h1>
                <p className="text-muted-foreground text-lg md:text-xl">
                  공지사항, 시설, 예약, 사용자를 관리할 수 있습니다.
                </p>
              </div>
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>공지사항 관리</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <Link href="/announcements-admin" className="flex items-center justify-between"
                            prefetch={false}>
                        <div>공지사항 목록</div>
                        <ArrowRightIcon className="h-5 w-5"/>
                      </Link>
                      <Link href="/announcement-write" className="flex items-center justify-between" prefetch={false}>
                        <div>새 공지사항 작성</div>
                        <ArrowRightIcon className="h-5 w-5"/>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>시설 관리</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <Link href="/facility-admin" className="flex items-center justify-between"
                            prefetch={false}>
                        <div>시설 목록</div>
                        <ArrowRightIcon className="h-5 w-5"/>
                      </Link>
                      <Link href="/facility-create"
                            className="flex items-center justify-between" prefetch={false}>
                        <div>새 시설 등록</div>
                        <ArrowRightIcon className="h-5 w-5"/>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>예약 관리</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <Link href="/reservation-admin" className="flex items-center justify-between" prefetch={false}>
                        <div>예약 신청 목록</div>
                        <ArrowRightIcon className="h-5 w-5"/>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>사용자 관리(서비스 예정...)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <Link href="#" className="flex items-center justify-between" prefetch={false}>
                        <div>사용자 목록</div>
                        <ArrowRightIcon className="h-5 w-5"/>
                      </Link>
                      <Link href="#" className="flex items-center justify-between" prefetch={false}>
                        <div>사용자 등록</div>
                        <ArrowRightIcon className="h-5 w-5"/>
                      </Link>
                      <Link href="#" className="flex items-center justify-between" prefetch={false}>
                        <div>사용자 정보 수정</div>
                        <ArrowRightIcon className="h-5 w-5"/>
                      </Link>
                      <Link href="#" className="flex items-center justify-between" prefetch={false}>
                        <div>관리자 권한 부여</div>
                        <ArrowRightIcon className="h-5 w-5"/>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>
      </div>
  )
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
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
        <path d="M5 12h14"/>
        <path d="m12 5 7 7-7 7"/>
      </svg>
  )
}
