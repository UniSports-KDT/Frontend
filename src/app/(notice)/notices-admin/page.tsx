import { NoticeAdmin } from '@/components/notice/notice-admin';
import { Suspense } from 'react';
import { getNotices } from "@/api";
import { Notice } from '@/types/notice';

async function AdminNoticesContent() {
    try {
        const notices: Notice[] = await getNotices();
        return <NoticeAdmin notices={notices} />;
    } catch (error) {
        console.error('Failed to fetch notices:', error);
    }
}

export default async function AdminNoticesPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-xl font-bold">로딩 중...</div>}>
            <AdminNoticesContent />
        </Suspense>
    )
}