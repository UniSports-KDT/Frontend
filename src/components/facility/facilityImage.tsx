import Image from 'next/image';
import { useState } from 'react';
import { Building2 } from 'lucide-react'; // 아이콘 라이브러리에서 적절한 아이콘 import

function isExternalUrl(url: string): boolean {
    return url?.startsWith('http://') || url?.startsWith('https://');
}

export function FacilityImage({ src, alt, className }: { src?: string, alt: string, className?: string }) {
    const [error, setError] = useState(false);

    if (!src || error) {
        return (
            <div className={`w-full h-full bg-gray-100 flex flex-col items-center justify-center ${className}`}>
                <Building2 className="w-12 h-12 text-gray-400 mb-2" />
                <span className="text-gray-500 text-sm text-center px-2">{alt}</span>
            </div>
        );
    }

    return (
        <Image
            src={src}
            alt={alt}
            fill
            className={`object-cover ${className}`}
            unoptimized={isExternalUrl(src)}
            onError={() => setError(true)}
        />
    );
}