import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsString } from "class-validator";
import { HydratedDocument } from "mongoose";

export type DeviceDocument = HydratedDocument<Device>;

@Schema()
export class Device {
  @ApiProperty({ example: 123456, description: "Uid" })
  @IsNotEmpty({ message: "Uid required" })
  @IsInt({ message: "Uid is a number" })
  @Prop()
  uid: number;

  @ApiProperty({ example: "TP link", description: "vendor" })
  @IsNotEmpty({ message: "vendor required" })
  @IsString({ message: "vendor is a string" })
  @Prop()
  vendor: string;

  @ApiProperty({ example: 1688174565, description: "Date" })
  @IsNotEmpty({ message: "Date required" })
  @IsInt({ message: "Date is a number (timestamp)" })
  @Prop()
  date: number;

  @ApiProperty({ example: true, description: "status" })
  @IsNotEmpty({ message: "status required" })
  @IsBoolean({ message: "Date is a boolean" })
  @Prop()
  status: boolean;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
DeviceSchema.index({ uid: 1 }, { unique: true });
