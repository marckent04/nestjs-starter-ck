import { Module } from '@nestjs/common';
import { ConfigurationModule } from "@core/modules/configuration.module";
import { APP_PIPE } from "@nestjs/core";
import { appValidationRequestPipe } from "@pipes/Validation.pipe";

@Module({
  imports: [
    ConfigurationModule,
  ],
  providers: [{
    provide: APP_PIPE,
    useValue: appValidationRequestPipe
  }]
})
export class CoreModule {}
