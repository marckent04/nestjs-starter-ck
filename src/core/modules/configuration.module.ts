import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env.local", ".env"],
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'test'),
        PORT: Joi.number().default(3000),
        JWT_SECRET: Joi.string()
      }),
    })
  ]
})
export class ConfigurationModule {}
