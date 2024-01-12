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
    

}
