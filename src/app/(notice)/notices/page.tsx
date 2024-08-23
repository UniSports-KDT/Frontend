import { Suspense } from 'react';
import { getNotices } from "@/api";
import Notices from '@/components/notice/notices';
import { Notice } from '@/types/notice';

async function NoticesContent() {
    try {
        const notices: Notice[] = await getNotices();
        return <Notices notices={notices} />;
    } catch (error) {
        console.error('Failed to fetch notices:', error);
    }
}

export default async function NoticesPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-xl font-bold">로딩 중...</div>}>
            <NoticesContent />
        </Suspense>
    )
}