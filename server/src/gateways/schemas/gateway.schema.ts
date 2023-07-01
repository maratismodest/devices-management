import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsIP, IsNotEmpty, IsString } from "class-validator";
import { HydratedDocument } from "mongoose";

export type GatewayDocument = HydratedDocument<Gateway>;

@Schema()
export class Gateway {
  @ApiProperty({ example: "sn-123456", description: "Serial Number" })
  @IsNotEmpty({ message: "sn required" })
  @IsString({ message: "sn is a string" })
  @Prop()
  sn: string;

  @ApiProperty({ example: "Some gateway", description: "Human readable name" })
  @IsNotEmpty({ message: "Name required" })
  @IsString({ message: "Name is a string" })
  @Prop()
  name: string;

  @ApiProperty({ example: "8.8.8.8", description: "IP-address" })
  @IsNotEmpty({ message: "ip4 required" })
  @IsString({ message: "ip4 is a string" })
  @Prop()
  ip4: string;

  @ApiProperty({ example: "[1111, 2222, 3333]", description: "IP-address" })
  @IsArray({ message: "devices is an array" })
  @Prop()
  devices: string[];
}

export const GatewaySchema = SchemaFactory.createForClass(Gateway);
GatewaySchema.index({ sn: 1 }, { unique: true });
