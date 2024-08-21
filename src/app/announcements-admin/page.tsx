import { AnnouncementsAdmin } from '@/components/admin/announcements-admin';
import { Suspense } from 'react';
import { getAnnouncements } from "@/lib/api";
import { Announcement } from '@/types/announcements';

async function AdminAnnouncementsContent() {
    const announcements = await getAnnouncements(false) as Announcement[];
    return <AnnouncementsAdmin announcements={announcements} />;
}

export default async function AdminAnnouncementsPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-xl font-bold">로딩 중...</div>}>
            <AdminAnnouncementsContent />
        </Suspense>
    )
}
export const revalidate = 3600; // 1시간마다 재검증