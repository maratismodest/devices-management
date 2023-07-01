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
    .setTitle("Example")
    .setDescription("The example API description")
    .setExternalDoc("swagger-spec.json", "http://localhost:8080/api-json")
    .setVersion("1.0")
    .addTag("example")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync("./swagger-spec.json", JSON.stringify(document));

  SwaggerModule.setup("api", app, document);

  await app.listen(8080);
}

bootstrap();
