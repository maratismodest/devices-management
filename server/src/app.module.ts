import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DevicesModule } from "./devices/devices.module";
import { GatewaysModule } from "./gateways/gateways.module";

@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://maratismodest:Kazan2023!@maratismodest.1lt9ibq.mongodb.net/?retryWrites=true&w=majority"), GatewaysModule, DevicesModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
