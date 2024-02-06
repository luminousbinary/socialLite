import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) { }

    async findUserById(userid: string): Promise<User> {

        const user = await this.prismaService.user.findFirst({
            where: { id: userid },
            //  // may not need to include post
            // include: { posts: true }
        })
        // delete (await user).password
        delete user.password
        return user
    }

    async updateUserImageById(id: string, imagePath: object) {
        const user = await this.prismaService.user.update({
            where: { id },
            data: {
                imagePath
            }
        })
        return user
    }

    async getUserImageById(id: string) {
        const user = await this.prismaService.user.findUnique({
            where: { id },
        })

        delete user.password
        return user.imagePath
    }


    async checkForRequset(creator: User,
        receiver: User) {
        const friendReq = await this.prismaService.friendRequest.findMany({
            where: {
                OR: [
                    { sentFriendRequest: creator, receivedFriendRequest: receiver },
                    { sentFriendRequest: receiver, receivedFriendRequest: creator }
                ]
            }
        });

        console.log(friendReq);
        return friendReq.toString() === "" ? false : true

    }

    async sendRequest(receiverId: string, sender: User) {
        // console.log('this is sender', sender);
        // console.log('this is receiver', receiverId);

        const receiver = await this.findUserById(receiverId)
        // console.log('ccc this s  recceiver', receiver);

        // const hasRequest = await this.checkForRequset(sender, receiver)
        if (receiver.id == sender.id) {
            return {
                error: 'Can not add self'
            }
        }

        const hasRequest = await this.checkForRequset(sender, receiver)

        // console.log('ccc this s  recceiver', receiver);
        // console.log('does he have req? ', hasRequest);

        if (receiver && hasRequest == false) {
            return this.prismaService.friendRequest.create({
                data: {
                    sentFriendRequestId: sender.id,
                    receivedFriendRequestId: receiver.id,
                    status: 'pending',
                }
            });
        } else { console.log(' Request already exist'); return { error: ' request already exist' } }

    }


    // // // has not been testes down wards
    async getFriendRequestStatus(receiverId: string, user: User) {

        const theReceiver = await this.findUserById(receiverId)
        const requestSent = await this.prismaService.friendRequest.findFirst({
            where: {
                OR: [{ sentFriendRequest: user, receivedFriendRequest: theReceiver },
                { sentFriendRequest: theReceiver, receivedFriendRequest: user }]
            },
            include: {
                sentFriendRequest: true,
                receivedFriendRequest: true
            }

        })

        if (requestSent?.receivedFriendRequestId === user.id) {
            return { status: 'waiting-for-current-user-response' }
        }
        return { status: requestSent?.status || 'not-sent' }
    }

    async getFriendRequestById (friendRequestId: string){
        return this.prismaService.friendRequest.findUnique({
            where:{id:friendRequestId}
        })
    }




}



//  where there s a switch map ust assign it to a variable



