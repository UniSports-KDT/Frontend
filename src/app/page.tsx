import Homepage from "@/components/homepage";
import { Suspense } from 'react';
import {getNotices} from "@/api";
import { Notice } from '@/types/notice';

async function HomePageContent() {
    const notices = await getNotices();
    return <Homepage notices={notices} />;
}

export default async function HomePage() {
  return (
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-xl font-bold">로딩 중...</div>}>
          <HomePageContent />
      </Suspense>
  );
}
