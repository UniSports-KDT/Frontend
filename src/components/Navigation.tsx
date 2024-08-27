'use client'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

const Navigation: React.FC = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { isLoggedIn, username, userId, logout } = useAuth();

    useEffect(() => {
        setMounted(true);
    }, []);

    const navItems = [
        { href: '/', label: '홈' },
        { href: '/facility-lists', label: '시설' },
        { href: `/reservation-list/${userId}`, label: '예약내역', requireAuth: true },
        { href: '/notices', label: '공지사항' },
        { href: '/admin', label: '관리자 페이지', requireAuth: true },
    ];

    const isActive = (href: string) => {
        if (href === '/') {
            return pathname === '/';
        }
        if (href === '/facility-lists') {
            return pathname.startsWith('/facility-lists') || pathname.startsWith('/facility/');
        }
        if (href.startsWith('/reservation-list/')) {
            return pathname.startsWith('/reservation-list/') || pathname.startsWith('/reservation/');
        }
        if (href === '/notices') {
            return pathname === '/notices' || pathname.startsWith('/notices/');
        }
        if (href === '/admin') {
            return pathname.startsWith('/admin');
        }
        return false;
    };

    const handleNavItemClick = () => {
        setIsOpen(false);
    };

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    const handleNotLoggedInClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!isLoggedIn) {
            e.preventDefault();
            router.push('/login');
        }
    };

    return (
        <nav className="flex items-center justify-between w-full">
            <Link onClick={handleNavItemClick} href="/" className="flex items-center gap-2" prefetch={false}>
                <MountainIcon className="h-6 w-6"/>
                <span className="text-lg font-bold">UniSport</span>
            </Link>
            <div className="hidden lg:flex items-center space-x-14">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`nav-link ${mounted && isActive(item.href) ? 'active' : ''}`}
                        onClick={item.requireAuth ? handleNotLoggedInClick : undefined}
                        prefetch={false}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
            <div className="hidden lg:flex items-center gap-4">
                {isLoggedIn ? (
                    <>
                        <span className="text-primary-foreground">{username}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-primary-foreground text-primary px-4 py-2 rounded-md transition-colors duration-300"
                        >
                            로그아웃
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/login" className="nav-link" prefetch={false}>
                            로그인
                        </Link>
                        <Link
                            href="/signup"
                            className="bg-primary-foreground text-primary px-4 py-2 rounded-md transition-colors duration-300"
                            prefetch={false}
                        >
                            회원가입
                        </Link>
                    </>
                )}
            </div>
            <div className="lg:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 text-primary-foreground hover:text-white transition-colors"
                    aria-label="메뉴 토글"
                >
                    <Menu size={24} />
                </button>
            </div>
            {isOpen && (
                <div className="absolute top-14 left-0 right-0 bg-primary border-b border-border lg:hidden">
                    {navItems.map((item, index) => (
                        <React.Fragment key={item.href}>
                            <Link
                                href={item.href}
                                className={`block px-4 py-3 nav-link ${
                                    mounted && isActive(item.href) ? 'active bg-primary-foreground/10' : ''
                                } hover:bg-primary-foreground/5 transition-colors duration-200`}
                                onClick={item.requireAuth ? handleNotLoggedInClick : handleNavItemClick}
                                prefetch={false}
                            >
                                {item.label}
                            </Link>
                            {index < navItems.length - 1 && (
                                <div className="border-t border-white/20 mx-4"></div>
                            )}
                        </React.Fragment>
                    ))}
                    <div className="border-t border-white/20 mx-4"></div>
                    {isLoggedIn ? (
                        <>
                            <div className="px-4 py-3 text-primary-foreground">{username}</div>
                            <div className="border-t border-white/20 mx-4"></div>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-3 hover:bg-primary-foreground/5 transition-colors duration-200"
                            >
                                로그아웃
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="block px-4 py-3" onClick={handleNavItemClick} prefetch={false}>
                                로그인
                            </Link>
                            <div className="border-t border-white/20 mx-4"></div>
                            <Link href="/signup" className="block px-4 py-3" onClick={handleNavItemClick} prefetch={false}>
                                회원가입
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};


export default Navigation;

function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
        </svg>
    )
}