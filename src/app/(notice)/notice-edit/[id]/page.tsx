import { Suspense } from 'react';
import NoticeEdit from '@/components/notice/notice-edit';

export default function NoticeEditPage({ params }: { params: { id: string } }) {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-xl font-bold">로딩 중...</div>}>
            <NoticeEdit id={params.id} />
        </Suspense>
    );
}