import Homepage from "@/components/homepages";
import { Suspense } from 'react';
import {getAnnouncements} from "@/lib/api";

export default async function HomePage() {
  return (
      <Suspense fallback={<div>로딩 중...</div>}>
        <HomePageContent />
      </Suspense>
  );
}

async function HomePageContent() {
  const announcements = await getAnnouncements();
  return <Homepage announcements={announcements} />;
}

export const revalidate = 3600; // 1시간마다 재검증
