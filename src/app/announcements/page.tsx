import { Suspense } from 'react';
import { getAnnouncements } from "@/lib/api";
import Announcements from '@/components/announcement/announcements';
import { Announcement } from '@/types/announcements';

async function AnnouncementsContent() {
    // const announcements = await getAnnouncements();
    // return <Announcements announcements={announcements as Announcement[]} />;
    const announcements = await getAnnouncements(false) as Announcement[];
    return <Announcements announcements={announcements} />;
}

export default async function AnnouncementsPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">로딩 중...</div>}>
            <AnnouncementsContent />
        </Suspense>
    )
}
export const revalidate = 3600; // 1시간마다 재검증
