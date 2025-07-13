import cloudinary from './cloudinaryService';

export interface UploadResult {
  url: string;
  format: string;
}

const uploadImages = async ({ files, folder }: {
  files: Express.Multer.File[];
  folder: string;
}):Promise<UploadResult[]> => {
    const uploads = await Promise.all(
        files.map((file) =>
            new Promise<{
                url: string;
                format: string;
            }>((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder },
                    (err, result) => {
                        if (err || !result) return reject(err || new Error('Cloudinary error'));
                        resolve({ url: result.secure_url, format: result.format });
                    }
                );
                stream.end(file.buffer);
            })
        )
    );

    return uploads;
}

export default uploadImages;
