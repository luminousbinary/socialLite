import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}



export class SignUpDto {
    @ApiProperty()
    @IsString()
    firstName: string;
  
    @ApiProperty()
    @IsString()
    lastName: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    userName: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userHandle: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string
  }
  