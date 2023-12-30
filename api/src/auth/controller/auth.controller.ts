import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthService } from '../service/auth.service';
import { Observable, from } from 'rxjs';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('register')
    registerUser(@Body() dto: User) {
        return (this.authService.registerAccount(dto))
    }

    @Post('login')
    login(@Body() dto: User) {
        return (this.authService.login(dto))
    }
}
