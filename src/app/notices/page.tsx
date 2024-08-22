import { Suspense } from 'react';
import { getNotices } from "@/api";
import Notices from '@/components/notice/notices';
import { Notice } from '@/types/notice';

async function NoticesContent() {
    const notices = await getNotices(false) as Notice[];
    return <Notices notices={notices} />;
}

export default async function NoticesPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-xl font-bold">로딩 중...</div>}>
            <NoticesContent />
        </Suspense>
    )
}
export const revalidate = 3600; // 1시간마다 재검증
