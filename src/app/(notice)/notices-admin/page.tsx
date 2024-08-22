import { NoticeAdmin } from '@/components/notice/notice-admin';
import { Suspense } from 'react';
import { getNotices } from "@/api";
import { Notice } from '@/types/notice';

async function AdminNoticesContent() {
    const notices = await getNotices(false) as Notice[];
    return <NoticeAdmin notices={notices} />;
}

export default async function AdminNoticesPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-xl font-bold">로딩 중...</div>}>
            <AdminNoticesContent />
        </Suspense>
    )
}