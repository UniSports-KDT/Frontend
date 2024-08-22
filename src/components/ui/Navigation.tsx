'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface NavigationProps {
    userId: string | number;
}

const Navigation: React.FC<NavigationProps> = ({ userId }) => {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const navItems = [
        { href: '/', label: '홈' },
        { href: '/facility-lists', label: '시설' },
        { href: `/reservation-list/${userId}`, label: '예약내역' },
        { href: '/notices', label: '공지사항' },
        { href: '/admin', label: '관리자 페이지' },
    ];

    const isActive = (href: string) => {
        if (href === '/') {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };

    return (
        <nav className="hidden md:flex items-center gap-16">
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={`nav-link ${mounted && isActive(item.href) ? 'active' : ''}`}
                    prefetch={false}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    );
};

export default Navigation;