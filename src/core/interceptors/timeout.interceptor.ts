import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import {
  catchError,
  Observable,
  throwError,
  timeout,
  TimeoutError,
} from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      timeout({ each: 2000 }),
      catchError((err: Error) =>
        throwError(() => {
          if (err instanceof TimeoutError) {
            throw new RequestTimeoutException();
          }
          return err;
        }),
      ),
    );
  }
}
