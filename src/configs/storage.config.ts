import multer, { diskStorage } from 'multer';
import { extname } from 'path';

export function storage(dest: string): multer.StorageEngine {
  return diskStorage({
    destination: `./public/static/${dest}`, //file destination
    filename: (
      req: any,
      file: Express.Multer.File,
      cb: (error: Error, filename: string) => void,
    ): void => cb(null, generateFileName(file, req.user.id)),
  });
}

//generate file name
function generateFileName(file: Express.Multer.File, id: number): string {
  const fileName: string = [id, Date.now()].join('-'); //penggabungan id dan tanggal
  return `${fileName}${extname(file.originalname)}`;
}
