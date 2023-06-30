import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDeviceDto {
  @IsNotEmpty()
  @IsNumber()
  readonly uid: number;

  @IsNotEmpty()
  @IsString()
  readonly vendor: string;

  @IsNotEmpty()
  @IsNumber()
  readonly date: number;

  @IsNotEmpty()
  @IsBoolean()
  readonly status: boolean;
}
