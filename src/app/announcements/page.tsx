import axios from 'axios';
import Announcements from '@/components/component/announcements';

async function getAnnouncements() {
    try {
        const res = await axios.get('http://3.39.23.4:8080/api/announcements', {
        });
        return res.data;
    } catch (error) {
        console.error('Failed to fetch announcements:', error);
        return [];
    }
}

export default async function AnnouncementsPage() {
    const announcements = await getAnnouncements();
    return <Announcements announcements={announcements} />;
}
