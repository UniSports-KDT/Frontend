import Homepage from "@/components/homepages";
import { Suspense } from 'react';
import {getNotices} from "@/api";
import { HomePageNotice } from '@/types/notice';

async function HomePageContent() {
    const notices = await getNotices(true) as HomePageNotice[];
    return <Homepage notices={notices} />;
}

export default async function HomePage() {
  return (
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-xl font-bold">로딩 중...</div>}>
          <HomePageContent />
      </Suspense>
  );
}
