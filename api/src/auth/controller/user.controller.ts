import { Body, Controller, Request, Get, Param, Post, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { JwtGuard } from '../guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { SaveImageStorage } from '../helpers/image-storage';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}


    @UseGuards(JwtGuard)
    @UseInterceptors(FileInterceptor("file", SaveImageStorage))
    @Post('upload')
    uploadProfileImage(@UploadedFile() file: Express.Multer.File, @Request() req){
            // const {fileName} = file
            console.log(file.filename);
            
        return // this.userService.updateUserImageById(req.user, file)
    }


    @Get(':id')
    displayProfileImage(@Param('id') id: string){
        return this.userService.getUserImageById(id)
    }
    

}
