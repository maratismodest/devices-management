import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import * as process from "process";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DevicesModule } from "./devices/devices.module";
import { GatewaysModule } from "./gateways/gateways.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env"
    }),
    MongooseModule.forRoot(`mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@maratismodest.1lt9ibq.mongodb.net/?retryWrites=true&w=majority`), GatewaysModule, DevicesModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
