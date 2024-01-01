import { Module } from '@nestjs/common';
import { FeedController } from './controller/feed.controller';
import { FeedService } from './service/feed.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { ContentCreatorGuard } from './guards/content-creator.guard';

@Module({
  imports:[PrismaModule, AuthModule],
  controllers: [FeedController],
  providers: [FeedService, ContentCreatorGuard]
})
export class FeedModule {}
