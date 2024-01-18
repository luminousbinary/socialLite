import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/service/auth.service';
import { FeedService } from '../service/feed.service';
import { FeedPost, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContentCreatorGuard implements CanActivate {
  constructor(private prismaService: PrismaService) { }

  async canActivate (
    context: ExecutionContext,
  ) {

    const request = context.switchToHttp().getRequest()

    const { user, params }: { user: User, params: { id: string } } = request;

    if (!user || !params) return false; // if no user or no post id exist then access cannot happen

    if (user.role === 'admin') return true // if user is an admin then admin can have access if he needs to
    
    const userid = user.id
    const feedid = params.id

  const isCreators = await this.prismaService.feedPost.findUnique({
    where:{
      id: feedid,
      authorId:userid        
    }

  })

  if (isCreators) return true

  return false
  
  return false

  }

  async creatorExist (user:string, postId:string)  {

    const isCreators = await this.prismaService.feedPost.findUnique({
      where:{
        id: postId,
        authorId:user        
      }

    })

    if (isCreators) return true

    return false
    
  }
}

// This comparison appears to be unintentional because the types 'string' and 'Promise<string>' have no overlap