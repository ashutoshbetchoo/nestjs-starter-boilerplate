import request from 'supertest';
import { app } from './setup';

interface ResponseBody {
  data: object;
}

describe('AppController (e2e)', () => {
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect(({ body }: { body: ResponseBody }) => {
        expect(body.data).toBe('Hello World!');
      });
  });
});
