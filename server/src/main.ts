import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as fs from "fs";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle("Device management")
    .setDescription("You can download interfaces via the below link")
    .setExternalDoc("swagger-spec.json", process.env.BASE_URL + "/api-json")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync("./swagger-spec.json", JSON.stringify(document));

  SwaggerModule.setup("api", app, document);

  await app.listen(8080);
}

bootstrap();
