import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GatewaysController } from "./gateways.controller";
import { GatewaysService } from "./gateways.service";
import { Gateway, GatewaySchema } from "./schemas/gateway.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Gateway.name, schema: GatewaySchema }])],
  controllers: [GatewaysController],
  providers: [GatewaysService]
})
export class GatewaysModule {
}
