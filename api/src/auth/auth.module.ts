import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from 'src/auth/controller/auth.controller';

@Module({
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
