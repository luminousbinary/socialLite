import { Body, Request, Controller, Post, Patch, Delete, Get, Param, Query, UseGuards } from '@nestjs/common';
import { FeedService } from '../service/feed.service';
import { CreatePostDto } from '../dto/feed.dto';
import { Observable, from } from 'rxjs';
import { FeedPost, Role } from '@prisma/client';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ContentCreatorGuard } from '../guards/content-creator.guard';

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

    
    @Roles(Role.admin, Role.user)
    @UseGuards(JwtGuard, RolesGuard)
    @Post()
    create(@Body() dto: CreatePostDto, @Request() req): Observable<FeedPost> {
        return from(this.feedService.createPost(req.user, dto));
    }

    @UseGuards(JwtGuard, ContentCreatorGuard) // content creator guard is now working at this moment but only content owner have access to delete or edit their content
    @Patch(':id')
    update(@Param('id') id: string,
        @Body() dto: CreatePostDto,
        @Request() req) {
        return from(this.feedService.updatePost(req.user, id, dto));
    }


    @UseGuards(JwtGuard, ContentCreatorGuard)// content creator guard is now working at this moment but only content owner have access to delete or edait their content
    @Delete(':id')
    delete(
        @Param('id') id: string,
        @Request() req
    ) {
        return this.feedService.deletePost(req.user, id);
    }




}
