import multer, { diskStorage } from 'multer';
import { extname } from 'path';

export function storage(dest: string): multer.StorageEngine {
  return diskStorage({
    destination: `./public/staitc/${dest}`,
    filename: (
      req: any,
      file: Express.Multer.File,
      cb: (error: Error, filename: string) => void,
    ): void => cb(null, generateFileName(file, req.user.id)),
  });
}

function generateFileName(file: Express.Multer.File, id: any): string {
  const fileName: string = [id, Date.now()].join('-');
  return `${fileName}${extname(file.originalname)}`;
}
