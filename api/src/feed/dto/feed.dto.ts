import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  body?: string;

  
  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ required: false, nullable: true })
  authorId: string | null;
}

// export class EdiFeedtDto {
//     @ApiProperty()
//     @IsString()
//     @IsOptional()
//     body?: string;
// }

