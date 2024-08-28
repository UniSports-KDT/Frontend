import Homepage from "@/components/homepage";
import { Suspense } from 'react';
import {getFacilityDetails, getNotices} from "@/api";
import { AuthProvider } from "@/contexts/AuthContext";
import { Facility } from '@/types/facility';

async function HomePageContent() {
    try {
        const notices = await getNotices();

        const sortedNotices = notices.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        const topNotices = sortedNotices.slice(0, 3);

        const facilityIds = [7, 10, 3]; //11
        const facilityPromises = facilityIds.map(id => getFacilityDetails(id));
        const facilities: Facility[] = await Promise.all(facilityPromises);
        console.log(facilities)

        return (
            <AuthProvider>
                <Homepage notices={topNotices} facilities={facilities} />
            </AuthProvider>
        )
    } catch (error) {
        console.error('공지사항 가져오기 실패:', error);
        return <div>Error loading notices</div>;
    }
}

export default async function HomePage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-xl font-bold">로딩 중...</div>}>
            <HomePageContent />
        </Suspense>
    );
}
