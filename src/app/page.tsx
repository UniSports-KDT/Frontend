import Homepage from "@/components/homepage";
import { Suspense } from 'react';
import {getNotices} from "@/api";
import { AuthProvider } from "@/contexts/AuthContext";

async function HomePageContent() {
    try {
        const notices = await getNotices();
        return (
            <AuthProvider>
                <Homepage notices={notices} />
            </AuthProvider>
        )
    } catch (error) {
        console.error('공지사항 가져오기 실패:', error);
        return <div>Error loading notices</div>;
    }
}

export default async function HomePage() {
  return (
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-xl font-bold">로딩 중...</div>}>
          <HomePageContent />
      </Suspense>
  );
}
