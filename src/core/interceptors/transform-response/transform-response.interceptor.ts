import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response: Response): Result => {
        if (!response) {
          return {
            data: [],
          };
        }

        // Handle the case where `response` contains both `data` and `meta`
        if (response.data && response.meta) {
          return {
            data: response.data,
            meta: response.meta,
          };
        }

        // If `meta` is missing, still return data (empty array if no `data` is found)
        return { data: response.data || response };
      }),
    );
  }
}

interface Response {
  data?: object; // Adjust the type of `data` as needed
  meta?: object; // Adjust the type of `meta` as needed
}

interface Result {
  data: object; // Adjust the type of `data` as needed
  meta?: object; // Adjust the type of `meta` as needed
}
