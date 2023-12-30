import { Body, Request, Controller, Post, Patch, Delete, Get, Param, Query, UseGuards } from '@nestjs/common';
import { FeedService } from '../service/feed.service';
import { CreatePostDto } from '../dto/feed.dto';
import { Observable, from } from 'rxjs';
import { FeedPost } from '@prisma/client';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('feed')
export class FeedController {

    constructor(private feedService: FeedService) { }

    // @Get()
    // findAll() {
    //     return this.feedService.findAllPost()
    // }
    @Get()
    findSelectedPost(@Query('take') take: number = 1, @Query('skip') skip: number = 1) {
        take = take > 20 ? 20 : take
        return this.feedService.findPosts(take, skip)
    }

    @UseGuards(JwtGuard)
    @Post()
    create(@Body() dto: CreatePostDto, @Request() req): Observable<FeedPost> {
        return from(this.feedService.createPost(req.user, dto));
    }


    @UseGuards(JwtGuard)
    @Patch(':id')
    update(@Param('id') id: string,
        @Body() dto: CreatePostDto,
        @Request() req) {
        return from(this.feedService.updatePost(req.user, id, dto));
    }


    @UseGuards(JwtGuard)
    @Delete(':id')
    delete(
        @Param('id') id: string,
        @Request() req
    ) {
        return this.feedService.deletePost(req.user, id);
    }




}
