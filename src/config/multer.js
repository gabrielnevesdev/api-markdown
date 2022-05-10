import { diskStorage } from 'multer';
import { resolve } from 'path';
import { randomBytes } from 'crypto';

const multerConfig = {
    dest: resolve(__dirname, '..','..', 'tmp', 'uploads'),
    storage: diskStorage({
        destination: (req, file, cb) =>{
            cb(null, resolve(__dirname, '..','..', 'tmp', 'uploads'))
        },
        filename: (req, file, cb) =>{
            randomBytes(16, (err, hash) =>{
                if(err) cb(err);

                file.key = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, file.key);
            });
        }
    }),
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req, file, cb)=> {
        console.log(file)
        const allowedMimes = [
            'text/markdown',
            'application/octet-stream',
        ];
        if(allowedMimes.includes(file.mimetype)){
            cb(null, true);
        }else{
            cb(new Error('Invalid file type.'));
        }
    }
}
export default multerConfig