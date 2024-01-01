import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/service/auth.service';
import { FeedService } from '../service/feed.service';
import { FeedPost, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContentCreatorGuard implements CanActivate {
  constructor(private prismaService: PrismaService) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest()

    const { user, params }: { user: User, params: { id: string } } = request;

    if (!user || !params) return false; // if no user or no post id exist then access cannot happen

    console.log(user.role, " this is rile ");
    if (user.role === 'admin') return true // if user is an admin then admin can have access if he needs to

    
    const userid = user.id
    const feedId = params.id
    

  // return 
  
  // let isCreator 
  const isAuthor = this.prismaService.feedPost.findUnique({
    where: {id:feedId,
    authorId: userid}
  })

  console.log(isAuthor, " this is author ");

  if(isAuthor) return true

  return false
    // UKM - wirk and have money and exp. 
    // 
    // 
    // 23:25:31:35


  }
}
// async function isCreator(userid:string, feedId: string) {

//   if (userid ){}

    
//   }

// This comparison appears to be unintentional because the types 'string' and 'Promise<string>' have no overlap