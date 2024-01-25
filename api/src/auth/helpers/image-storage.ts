import { diskStorage } from "multer";
import { v4 as uuidv4 } from 'uuid'
import * as path from 'path';

import fs from 'node:fs';
import { fileTypeFromFile } from 'file-type';
import { Observable, map } from "rxjs";
import { extname } from "path";
import { BadRequestException } from "@nestjs/common";

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

        // Check file extension
      const isValidExtension = validFileExtension.some(ext => ext === extname(file.originalname).toLowerCase());
      if (!isValidExtension) {
        return callback(new BadRequestException('Invalid file extension. Allowed: jpg, jpeg, png'), false);
      }

      const isValidMime = validMineType.some(ext => ext === extname(file.originalname).toLowerCase());
      if (!isValidExtension) {
        return callback(new BadRequestException('Invalid file extension. Allowed: jpg, jpeg, png'), false);
      }
      
    // //   Check file type using file-type
    //   const stream = file.stream;
    //   fileTypeFromFile(stream).then(type => {
    //     if (!type || !type.mime.startsWith('image/')) {
    //       return callback(new BadRequestException('Invalid file type. Must be an image'), false);
    //     }
    //     callback(null, true);
    //   });
        // const alloweMineTypes: validMineType[] = validMineType;
        // alloweMineTypes.includes(file.mimetype) ? callback(null, true) : callback(null, true)
   

    }
}

// export const isFileExtensonSafe =  (fullFilePath:string) =>  {

    
    

//  await fileTypeFromFile(fullFilePath).then((fileExtensionAndMine:{ext:validFileExtension, mime: validMineType})=>{
//         if (!fileExtensionAndMine) return false

//         const legitFileType = validFileExtension.some((fileExtensionAndMine:{ext:validFileExtension, mime: validMineType})=>{});
//         const legitMimeType = validMineType.includes(fileExtensionAndMine.mime);

//     })
//     // return theFile;
// }


const removeFilePath = (fullFilePath:string) =>{

}