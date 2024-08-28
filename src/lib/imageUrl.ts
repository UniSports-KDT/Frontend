import {authenticatedFetch} from "@/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getPresignedUrl(filename: string): Promise<string> {
    try {
        const response = await authenticatedFetch(`${API_URL}/presigned-url?filename=${encodeURIComponent(filename)}`);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to get presigned URL: ${response.status} ${errorText}`);
        }
        return await response.text();
    } catch (error) {
        console.error('Error getting presigned URL:', error);
        throw error;
    }
}

export async function uploadImageToS3(presignedUrl: string, file: File): Promise<void> {
    try {
        const response = await fetch(presignedUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': file.type,
            },
            body: file,
        });

        if (!response.ok) {
            throw new Error('Failed to upload image');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}
