import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import * as argon from "argon2";
import { JwtService } from '@nestjs/jwt/dist';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private readonly config: ConfigService,
        private prisma: PrismaService,
        private readonly jwt: JwtService
    ) { }

    hashPassword(password: string) {
        return argon.hash(password)
    }

    async registerAccount(dto: User) {
        try {
            // generate hashed password
            const hash = await this.hashPassword(dto.password);
            //save user to db
            const user = await this.prisma.user.create({
                data: {
                    ...dto,
                    // userName: dto.userName,
                    // userHandle: dto.userHandle,
                    email: dto.email,
                    password: hash,
                },
            });

            // delete password
            delete user.password
            //return new saved user to db
            // return user
            return this.signToken(user.id, user.email);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new ForbiddenException("Credentials taken");
                }
            }
            throw error;
        }
    }

    async login(dto: User) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        // if user does not exist trow an exception
        if (!user) throw new ForbiddenException("Credentials incorrect");

        // compare the password
        const pwMatch = await argon.verify(user.password, dto.password);
        // if password i sincorrect trow an exception
        if (!pwMatch) throw new ForbiddenException("Credentials incorrect");


        // delete password
        delete user.password

        // // send back user
        return this.signToken(user.id, user.email);
    }


    async signToken(
        userId: string,
        email: string
    ): Promise<{ access_token: string }> {
        const payload = {
            id: userId, // previusly seb
            email,
        };
        const token = await this.jwt.signAsync(payload, {
            expiresIn: "15m",
            secret: this.config.get("JWT_SECRET"),
        });

        return {
            access_token: token,
        };
    }

    async findUserById(id: string): Promise<User>  {

        const user = await this.prisma.user.findUnique({
            where: { id },
            include: { posts: true }
        })
        // delete (await user).password
        delete user.password
        return user
    }
}

