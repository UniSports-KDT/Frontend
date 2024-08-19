import Homepage from '@/components/component/homepages';
import axios from 'axios';
import {Announcement, HomePageAnnouncement} from '@/types/announcements';

async function getAnnouncements(): Promise<HomePageAnnouncement[]> {
    try {
        const response = await axios.get<Announcement[]>('http://3.39.23.4:8080/api/announcements');
        return response.data.map(({ id, title, content }) => ({ id, title, content }));
    } catch (error) {
        console.error('공지사항 가져오는 중 오류 발생:', error);

        // 오류 발생 시 하드코딩 데이터 반환
        return [
            {
                id: 1,
                title: "새로운 체육관 장비 설치",
                content: "최신 장비를 추가로 설치했습니다. 확인해보세요!"
            },
            {
                id: 2,
                title: "수영장 정기 점검 안내",
                content: "수영장은 6월 1일부터 15일까지 정기 점검으로 이용이 불가능합니다."
            },
            {
                id: 3,
                title: "새로운 배드민턴 코트 오픈",
                content: "2개의 새로운 배드민턴 코트 오픈! 지금 예약하세요!"
            },
        ];
    }
}

export default async function HomePage() {
    const announcements = await getAnnouncements();
    return <Homepage announcements={announcements} />;
}