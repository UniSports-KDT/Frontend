import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Facility } from '@/types/facility';

interface PopularFacilitiesProps {
    facilities: Facility[];
}

const PopularFacilities: React.FC<PopularFacilitiesProps> = ({ facilities }) => {
    const [currentImageIndices, setCurrentImageIndices] = useState<number[]>(facilities.map(() => 0));

    const toggleImage = (facilityIndex: number) => {
        setCurrentImageIndices(prevIndices =>
            prevIndices.map((index, i) =>
                i === facilityIndex && facilities[facilityIndex].imageUrls && facilities[facilityIndex].imageUrls.length > 1
                    ? (index + 1) % 2
                    : index
            )
        );
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">인기 시설</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {facilities.map((facility, facilityIndex) => (
                    <div key={facility.id} className="bg-muted rounded-lg p-4 space-y-3">
                        <div className="relative w-full h-64 md:h-72 lg:h-80">
                            {facility.imageUrls && facility.imageUrls.length > 0 ? (
                                <>
                                    <Image
                                        src={facility.imageUrls[currentImageIndices[facilityIndex]]}
                                        alt={facility.name}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-lg"
                                    />
                                    {facility.imageUrls.length > 1 && (
                                        <>
                                            <button
                                                onClick={() => toggleImage(facilityIndex)}
                                                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 hover:bg-opacity-90 rounded-full p-3 shadow-lg transition-all duration-200 ease-in-out"
                                                aria-label="이전 이미지"
                                            >
                                                <ChevronLeft color="white" size={26}/>
                                            </button>
                                            <button
                                                onClick={() => toggleImage(facilityIndex)}
                                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 hover:bg-opacity-90 rounded-full p-3 shadow-lg transition-all duration-200 ease-in-out"
                                                aria-label="다음 이미지"
                                            >
                                                <ChevronRight color="white" size={26}/>
                                            </button>
                                        </>
                                    )}
                                </>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg">
                                    <span className="text-gray-500">이미지 없음</span>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold">{facility.name}</h3>
                            <Link href={`/facility-reservations/${facility.id}`} className="text-primary hover:cursor">
                                시설 보기
                            </Link>
                        </div>
                        <p className="text-muted-foreground font-bold">{facility.description}</p>
                        <p className="text-sm text-muted-foreground">위치: {facility.location}</p>
                        <p className="text-sm text-muted-foreground">운영 시간: {facility.operatingHours}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularFacilities;