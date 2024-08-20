export interface Facility {
    id: number;
    name: string;
    description: string;
    location: string;
    operatingHours: string;
    fee: number;
    attachmentFlag: string;
    createdAt: string;
    updatedAt: string;
    imageUrls: string[] | null;
}

export interface FacilityListProps {
    facilities: Facility[];
}