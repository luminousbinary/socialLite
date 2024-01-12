import { Injectable } from '@nestjs/common';
import { FeedPost, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from '../dto/feed.dto';
import { Observable, from } from 'rxjs';

@Injectable()
export class FeedService {
    constructor(private prisma: PrismaService) { }

    async createPost(user: User, dto: CreatePostDto) {

        console.log(dto);

        // feedPost.authorId = "11"
        return this.prisma.feedPost.create({
            data: {
                ...dto,
                authorId: user.id
            }
        })

    }

    async findAllPost(): Promise<Observable<{ id: string; createdAt: Date; body: string; authorId: string; }[]>> {
        return from(this.prisma.feedPost.findMany())

    }

    async findPosts(take: number = 10, skip: number = 1) {

        const posts = await this.prisma.feedPost.findMany({
            take: + take,
            skip: +skip,
            // cursor: {
            //     id: myCursor
            // },
            where: {

            },
            orderBy: {
                createdAt: "desc"
            }


        })
        // const lastPostInResults = posts[3] // Remember: zero-based index! :)
        // const myCursor = lastPostInResults.id // Example: 52

        return posts

    }

    async updatePost(user: User, postId: string, dto: CreatePostDto) {

        const post = await this.prisma.feedPost.updateMany({
            where: {
                id: postId,
                // author: user

            },
            data: {
                ...dto,
            },
        })

        return post
    }

    async deletePost(user: User, postId: string) {

        return await this.prisma.feedPost.deleteMany({
            where: {
                id: postId,
                // author: user
            }
        })

    }

    async findPostById(id: string)  {

        const post = await this.prisma.feedPost.findUnique({
            where: { id },
            include: { author: true }

        })
        // delete (await post).password
        return post.authorId
    }

}
