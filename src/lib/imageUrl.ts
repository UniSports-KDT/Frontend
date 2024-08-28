const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getPresignedUrl(filename: string): Promise<string> {
    try {
        const response = await fetch(`/presigned-url?filename=${filename}`);
        if (!response.ok) {
            throw new Error('Failed to get presigned URL');
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
