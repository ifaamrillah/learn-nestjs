import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, map, throwError } from 'rxjs';

type Response<T> = {
  code: number;
  text: string;
  data: T;
};

type ResponseError = {
  code: number;
  text: string;
  kind: string;
  details?: any;
};

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    return next
      .handle()
      .pipe(map(this.handleSuccess(context)), catchError(this.handleFailure));
  }

  handleSuccess(context: ExecutionContext): (data: T) => Response<T> {
    return (data) => {
      const http = context.switchToHttp();
      const code = http.getResponse().statusCode;
      const text = code >= 400 ? 'error' : 'success';

      return {
        code,
        text,
        data,
      };
    };
  }

  handleFailure(error: Error) {
    return throwError(() => {
      const resErr: ResponseError = {
        kind: error.name,
        text: error.message,
        code: 500,
      };

      if (error instanceof HttpException) {
        resErr.code = error.getStatus();

        const { message } = error.getResponse() as { message: any };
        if (message) resErr.details = message;
      }

      throw new HttpException(resErr, resErr.code);
    });
  }
}
