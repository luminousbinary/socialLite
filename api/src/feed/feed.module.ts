import { Module } from '@nestjs/common';
import { FeedController } from './controller/feed.controller';
import { FeedService } from './service/feed.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports:[PrismaModule],
  controllers: [FeedController],
  providers: [FeedService, PrismaService]
})
export class FeedModule {}
