import { Body, Controller, Request, Get, Param, Post, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { JwtGuard } from '../guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { SaveImageStorage } from '../helpers/image-storage';
import { of } from 'rxjs';
import { join } from 'path';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }


    @UseGuards(JwtGuard)
    @UseInterceptors(FileInterceptor("file", SaveImageStorage))
    @Post('upload')
    uploadProfileImage(@UploadedFile() file: Express.Multer.File, @Request() req) {
        const fileName = file?.filename
        // does not yet prevent none mage file.
        if (!fileName) return of({ Error: "File must be png, Jpeg or jpg" })
        // console.log(file.filename);
        // const imageFilePath = join(process.cwd(), "images");
        // const fullImagePath = join(imageFilePath + '/' + file.filename)

        return // of({ error: "file cpontent does not match extenson" }) // this.userService.updateUserImageById(req.user, file)
    }


    @Get(':id')
    displayProfileImage(@Param('id') id: string) {
        return this.userService.getUserImageById(id)
    }


    @UseGuards(JwtGuard)
    @Post('friend-request/send/:receiverId')
    sendFrendRequestById(@Param('receiverId') receiverId:string, @Request() req){
        return this.userService.sendRequest(receiverId, req.user)
    }

    @UseGuards(JwtGuard)
    @Get('friend-request/status/:receiverId')
    getFriendRequestStatus(@Param('receiverId') receiverId:string, @Request() req){
        return this.userService.getFriendRequestStatus(receiverId, req.user)
    }

    
 
}
