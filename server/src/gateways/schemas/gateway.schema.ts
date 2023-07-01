import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type GatewayDocument = HydratedDocument<Gateway>;

@Schema()
export class Gateway {
  @Prop()
  sn: string;

  @Prop()
  name: string;

  @Prop()
  ip4: string;

  @Prop()
  devices: string[];
}

export const GatewaySchema = SchemaFactory.createForClass(Gateway);
GatewaySchema.index({ sn: 1 }, { unique: true });
