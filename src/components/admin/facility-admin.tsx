import Link from "next/link"
import { Button } from "@/components/ui/button"

export function FacilityAdmin() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">시설 관리</h1>
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              새로운 시설 등록
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div className="bg-background rounded-lg shadow overflow-hidden">
              <Link href="#" className="block" prefetch={false}>
                <div className="p-4">
                  <h3 className="text-lg font-medium">체육관 A</h3>
                  <p className="text-muted-foreground">서울시 강남구 테헤란로 123</p>
                  <p className="text-muted-foreground">월-금 09:00 - 22:00</p>
                </div>
                <div className="flex items-center justify-end gap-2 bg-muted p-4">
                  <Button variant="outline" size="icon">
                    <FilePenIcon className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="outline" size="icon" className="text-red-500">
                    <TrashIcon className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </Link>
            </div>
            <div className="bg-background rounded-lg shadow overflow-hidden">
              <Link href="#" className="block" prefetch={false}>
                <div className="p-4">
                  <h3 className="text-lg font-medium">수영장 B</h3>
                  <p className="text-muted-foreground">서울시 송파구 올림픽로 240</p>
                  <p className="text-muted-foreground">월-일 06:00 - 22:00</p>
                </div>
                <div className="flex items-center justify-end gap-2 bg-muted p-4">
                  <Button variant="outline" size="icon">
                    <FilePenIcon className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="outline" size="icon" className="text-red-500">
                    <TrashIcon className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </Link>
            </div>
            <div className="bg-background rounded-lg shadow overflow-hidden">
              <Link href="#" className="block" prefetch={false}>
                <div className="p-4">
                  <h3 className="text-lg font-medium">테니스장 C</h3>
                  <p className="text-muted-foreground">서울시 강동구 천호대로 1234</p>
                  <p className="text-muted-foreground">월-토 09:00 - 20:00</p>
                </div>
                <div className="flex items-center justify-end gap-2 bg-muted p-4">
                  <Button variant="outline" size="icon">
                    <FilePenIcon className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="outline" size="icon" className="text-red-500">
                    <TrashIcon className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
      {/* <footer className="bg-muted text-muted-foreground py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-2">
              <LogInIcon className="h-6 w-6" />
              <span className="text-lg font-bold">UniSport</span>
            </div>
            <div className="text-sm">&copy; 2023 UniSport. All rights reserved.</div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-muted-foreground/80" prefetch={false}>
              이용 약관
            </Link>
            <Link href="#" className="hover:text-muted-foreground/80" prefetch={false}>
              개인정보 처리방침
            </Link>
            <div className="flex items-center gap-2">
              <Link href="#" className="hover:text-muted-foreground/80" prefetch={false}>
                <FacebookIcon className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-muted-foreground/80" prefetch={false}>
                <TwitterIcon className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-muted-foreground/80" prefetch={false}>
                <InstagramIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  )
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}


function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
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


function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}


function LogInIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
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


function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
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
    </svg>
  )
}


function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}
