import Homepage from "@/components/homepage";
import { Suspense } from 'react';
import {getNotices} from "@/api";

async function HomePageContent() {
    // const notices = await getNotices();
    // return <Homepage notices={notices} />;
    try {
        const notices = await getNotices();
        return <Homepage notices={notices} />;
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
