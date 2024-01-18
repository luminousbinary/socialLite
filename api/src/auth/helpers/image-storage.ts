import { diskStorage } from "multer";
import { v4 as uuidv4 } from 'uuid'
import * as path from 'path';

import fs from "fs";
import fileType from 'file-type';

// const path = require('path')

type validFileExtension = 'png' | 'jpg' | 'jpeg'
type validMineType = 'image/png' | 'image/jpg' | 'image/jpeg'

const validFileExtension: validFileExtension[] = ['png', 'jpg', 'jpeg']
const validMineType: validMineType[] = ['image/png', 'image/jpg', 'image/jpeg']
console.log('okay');


export const SaveImageStorage = {

    storage: diskStorage({
        destination: './images',
        filename(req, file, callback) {

            const fileExtension: string = path.extname(file.originalname);
            const fileName: string = uuidv4() + fileExtension
            callback(null, fileName);

        }


    }), fileFilter: (req, file, callback) => {

        const alloweMineTypes: validMineType[] = validMineType;
        alloweMineTypes.includes(file.mimetype) ? callback(null, true) : callback(null, true)
    }
}