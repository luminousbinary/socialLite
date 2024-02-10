import { ApiProperty } from "@nestjs/swagger";
import { FriendRequest_Status } from "@prisma/client";
import {  IsEnum, IsNotEmpty, IsString  } from "class-validator";

export class FriendRequestDto {
  // @ApiProperty()
  // // @IsEnum( FriendRequest_Status)
  // @IsString()
  // // @IsNotEmpty()
  // status: string
  // // FriendRequest_Status;
  
}

 