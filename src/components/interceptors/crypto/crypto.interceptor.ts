import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Crypto } from "./crypto";

@Injectable()
export class CryptoInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();

    const req: Request = ctx.getRequest();
    if (typeof req.body.data === "string") req.body = Crypto.decrypt(req.body);

    return next.handle().pipe(
      map((data: any) => {
        console.log(data);

        return Crypto.encrypt(data);
      }),
    );
  }
}
