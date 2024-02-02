import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService){}

    async findUserById(id: string): Promise<User>  {

        const user = await this.prismaService.user.findUnique({
            where: { id },
            include: { posts: true }
        })
        // delete (await user).password
        delete user.password
        return user
    }

    async updateUserImageById(id: string, imagePath: object){
        const user = await this.prismaService.user.update({
            where: {id},
            data:{
                imagePath
            } 
        })
        return user
    }

    async getUserImageById(id: string){
        const user = await this.prismaService.user.findUnique({
            where: {id},
        })

        delete user.password
        return user.imagePath
    }
    

    async checkForRequset(creator:User,
        receiver:User) {
            const friendReq = await this.prismaService.friendRequest.findMany({
                where: {sentFriendRequest:receiver, receivedFriendRequest:creator}
                
            })

            console.log(friendReq);
            
            return !friendReq? false : true

        
    }

}

//  where there s a switch map ust assign it to a variable


