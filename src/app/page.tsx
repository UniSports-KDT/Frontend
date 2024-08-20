import Homepage from "@/components/homepages";
import { Suspense } from 'react';
import {getAnnouncements} from "@/lib/api";
import { HomePageAnnouncement } from '@/types/announcements';

async function HomePageContent() {
    const announcements = await getAnnouncements(true) as HomePageAnnouncement[];
    return <Homepage announcements={announcements} />;
}

export default async function HomePage() {
  return (
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">로딩 중...</div>}>
          <HomePageContent />
      </Suspense>
  );
}
export const revalidate = 3600; // 1시간마다 재검증
