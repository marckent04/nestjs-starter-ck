import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import * as compression from "compression";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { CryptoInterceptor } from "@interceptors/crypto/crypto.interceptor";
import * as process from "process";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(compression());

  if (process.env.NODE_ENV === "production") {
    swaggerSetup(app)
  } else {
    app.useGlobalInterceptors(new CryptoInterceptor());
  }

  await app.listen(process.env.PORT).then(() => {
    console.log(`Server launched on port ${process.env.PORT}`);
  });
}
bootstrap();


function swaggerSetup(app:  NestExpressApplication) {
  const config = new DocumentBuilder()
    .setTitle("Api example")
    .setDescription("The API description")
    .setVersion("1.0")
    .addTag("api")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);
}