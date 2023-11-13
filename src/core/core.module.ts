import { Module } from '@nestjs/common';
import { ConfigurationModule } from "@core/modules/configuration.module";

@Module({
  imports: [
    ConfigurationModule
  ]
})
export class CoreModule {}
