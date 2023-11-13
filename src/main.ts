import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import * as compression from "compression";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { appValidationRequestPipe } from "./components/pipes/Validation.pipe";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //app.useGlobalInterceptors(new CryptoInterceptor());
  app.useGlobalPipes(appValidationRequestPipe);
  app.use(compression());

  const config = new DocumentBuilder()
    .setTitle("Api example")
    .setDescription("The API description")
    .setVersion("1.0")
    .addTag("api")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(process.env.PORT).then(() => {
    console.log(`Server launched on port ${process.env.PORT}`);
  });
}
bootstrap();
