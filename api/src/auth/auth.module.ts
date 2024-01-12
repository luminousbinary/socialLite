import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from 'src/auth/controller/auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';
import { UserService } from './service/user.service';

@Module({
  imports: [JwtModule.registerAsync({
    global: true,
    useFactory: () => ({
      secret: process.env.JWT_SECRETS,
      signOptions: { expiresIn: '3600s' }
    }),
  })],
  providers: [AuthService, PrismaService, JwtStrategy, RolesGuard, UserService],
  controllers: [AuthController],
  exports:[AuthService, UserService]
})
export class AuthModule { }
