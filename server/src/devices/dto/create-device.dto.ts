import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsString, Length, Min } from "class-validator";

export class CreateDeviceDto {
  @ApiProperty({ example: 1234567, description: "Uid" })
  @IsInt()
  readonly uid: number;

  @ApiProperty({ example: "TP-Link", description: "Vendor" })
  @IsNotEmpty()
  @IsString()
  @Length(2, 20)
  readonly vendor: string;

  @ApiProperty({ example: 1688193506, description: "Time (timestamp)" })
  @IsInt()
  @Min(0)
  readonly date: number;

  @ApiProperty({ example: true, description: "Status (online/offline)" })
  @IsBoolean()
  readonly status: boolean;
}
