import { IsIP, IsNotEmpty, IsString } from "class-validator";

export class CreateGatewayDto {
  @IsNotEmpty()
  @IsString()
  readonly sn: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @IsIP()
  readonly ip4: string;

  readonly devices: [];
}
