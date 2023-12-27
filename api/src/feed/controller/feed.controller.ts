import { Body, Controller, Post, Patch, Delete, Get, Param, Query } from '@nestjs/common';
import { FeedService } from '../service/feed.service';
import { CreatePostDto } from '../dto/feed.dto';
import { Observable, from } from 'rxjs';
import { FeedPost } from '@prisma/client';

@Controller('feed')
export class FeedController {

    constructor(private feedService: FeedService) { }

    // @Get()
    // findAll() {
    //     return this.feedService.findAllPost()
    // }

    @Get()
    findSelectedPost(@Query('take') take: number=1, @Query('skip') skip: number=1) {
        take = take > 20 ? 20: take 
        return this.feedService.findPosts(take ,skip)
    }

    @Post()
    create(@Body() dto: CreatePostDto): Observable<FeedPost> {
        return from(this.feedService.createPost(dto));
    }


    @Patch(':id')
    update(@Param('id') id: string,
        @Body() dto: CreatePostDto) {
        return from(this.feedService.updatePost(id, dto));
    }


    @Delete(':id')
    delete(
        @Param('id') id: string,
        @Body() dto: CreatePostDto
    ){
        return this.feedService.deletePost(id, dto);
    }




}
