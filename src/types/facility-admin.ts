export interface FacilityEditRequest {
    adminId: number;
    title: string;
    content: string;
}

export interface FacilityEditResponse {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    admin: {
        id: number;
        name: string;
        username: string;
        password: string;
        phone: string;
    };
}