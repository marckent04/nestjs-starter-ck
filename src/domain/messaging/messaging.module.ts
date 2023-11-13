import { Module } from '@nestjs/common';
import { SmsService } from './sms/sms.service';
import { MailService } from './mail/mail.service';

@Module({
  providers: [SmsService, MailService]
})
export class MessagingModule {}
