//시설조회는 SSG로 구현
import { Suspense } from 'react';
import { FacilityList } from '@/components/facility/facility-lists';
import { getFacilities } from '@/lib/api';
import { FacilityListProps } from '@/types/facility';

// 24시간마다 재검증
export const revalidate = 86400;

export default async function FacilityListPage() {
    const facilities = await getFacilities();

    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">로딩 중...</div>}>
            <FacilityListContent facilities={facilities} />
        </Suspense>
    );
}

function FacilityListContent({ facilities }: FacilityListProps) {
    return <FacilityList facilities={facilities} />;
}
