import { Module } from '@nestjs/common';
import { FeedModule } from './feed/feed.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { CoreModule } from './core/core.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/controller/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    FeedModule, PrismaModule, AuthModule, ChatModule, CoreModule],
  providers: [PrismaService],
  controllers: [AuthController],
})
export class AppModule { }
