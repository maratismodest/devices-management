import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type DeviceDocument = HydratedDocument<Device>;

@Schema()
export class Device {
  @Prop()
  uid: number;

  @Prop({
    type: String, validate: {
      validator: (value) => Promise.resolve(value.length > 4),
      message: "Password validation failed"
    }
  })
  vendor: string;

  @Prop()
  date: number;

  @Prop()
  status: boolean;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
