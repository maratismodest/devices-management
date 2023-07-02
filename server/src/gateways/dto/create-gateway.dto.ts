import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsIP, IsNotEmpty, IsString } from "class-validator";

export class CreateGatewayDto {
  @ApiProperty({ example: "sn-123456", description: "Serial Number" })
  @IsNotEmpty()
  @IsString()
  readonly sn: string;

  @ApiProperty({ example: "Gateway-1", description: "Name" })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: "192.168.10.12", description: "IP address" })
  @IsNotEmpty()
  @IsString()
  @IsIP()
  readonly ip4: string;

  @ApiProperty({ example: [], description: "Devices" })
  @IsArray()
  readonly devices: [];
}
