import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "@domain/user/user.module";
import { AuthModule } from "@domain/auth/auth.module";
import { DatabaseModule } from '@db/database.module';
import { MessagingModule } from '@domain/messaging/messaging.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
@Module({
  imports: [
    UserModule,
    AuthModule,
    DatabaseModule,
    MessagingModule,
    SharedModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}