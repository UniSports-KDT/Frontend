import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link"
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

const userId = 123; // 실제 userId로 변경해야됨 (예약내역으로 이동 시 필요)

export const metadata: Metadata = {
  title: "UniSport",
  description: "UniSport에 오신 것을 환영합니다!",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
      <header className="bg-primary text-primary-foreground fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-2">
          <Navigation userId={userId}/>
        </div>
      </header>
      <div className="flex-grow flex flex-col pt-16">
        <main className="flex-grow overflow-y-auto">
          {children}
        </main>
        <footer className="bg-muted text-muted-foreground py-6 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <h4 className="font-semibold">유니스포츠</h4>
              <p>당신의 스포츠 시설 관리 솔루션</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">빠른 링크</h4>
              <ul className="space-y-1">
                <li>
                  <Link href="#" prefetch={false}>
                    이용 약관
                  </Link>
                </li>
                <li>
                  <Link href="#" prefetch={false}>
                    개인정보 보호 정책
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">문의</h4>
              <p>전화: 123-456-7890</p>
              <p>이메일: info@unisport.com</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">팔로우 하기</h4>
              <div className="flex items-center gap-4">
                <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                  <FacebookIcon className="h-6 w-6"/>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                  <TwitterIcon className="h-6 w-6"/>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                  <InstagramIcon className="h-6 w-6"/>
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
      </body>
      </html>
  );
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