import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('UserController E2E Test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // Find all users
  it('should return 200 and list users', async () => {
    return request(app.getHttpServer()).get('/users').expect(200);
  });

  // Find user with incorrect id
  it('should return 404 status when find with incorrect id', () => {
    return request(app.getHttpServer())
      .get('/users/5a362d59-c6a8-419a-9872-a91cd22cfe8f')
      .expect(404)
      .expect({
        message: 'User dost not exist!',
        error: 'Not Found',
        statusCode: 404,
      });
  });

  // Create exits email
  it('should return 400 status when exits email', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        user_name: 'trankhaihoang1',
        email: 'khaihoang.tran.clv@gmail.com',
        full_name: 'Khai Hoang Tran1',
        password: 'hoangbo741',
      })
      .expect(400)
      .expect({
        message: 'Email already exits',
        error: 'Bad Request',
        statusCode: 400,
      });
  });

  it('should return 400 status when invalid email', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        user_name: 'trankhaihoang1',
        email: 'khaihoang.tran.clvgmail.com',
        full_name: 'Khai Hoang Tran1',
        password: 'hoangbo741',
      })
      .expect(400);
  });

  // Delete user with incorrect id
  it('should return 404 status when delete with incorrect id', () => {
    return request(app.getHttpServer())
      .delete('/users/e3fd7419-6e4f-4eff-a184-28038ca8df68')
      .expect(404)
      .expect({
        message: 'User dose not exits!',
        error: 'Not Found',
        statusCode: 404,
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
