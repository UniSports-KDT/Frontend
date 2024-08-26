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

// export interface FacilityEditData {
//     name: string;
//     description: string;
//     location: string;
//     availableHours: string;
//     fee: number;
//     attachmentFlag: string;
//     attachmentNames: string[];
// }
export interface FacilityEditData {
    name: string;
    description: string;
    location: string;
    availableHours: string;
    startTime: string;
    endTime: string;
    fee: number;
    attachmentFlag: string;
    attachmentNames: string[];
}

export interface FacilityEditProps {
    initialData: Facility;
}