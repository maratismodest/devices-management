import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type DeviceDocument = HydratedDocument<Device>;

@Schema()
export class Device {
  @Prop()
  uid: number;

  @Prop()
  vendor: string;

  @Prop()
  date: number;

  @Prop()
  status: boolean;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
DeviceSchema.index({ uid: 1 }, { unique: true });
