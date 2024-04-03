import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { userTesting } from './testing.data';
import { DataSource } from 'typeorm';
describe('User E2E Test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    const dataSource = app.get(DataSource);
    await dataSource.synchronize(true);
    await app.init();
  });

  describe('Query User', () => {
    it('Should return 200 and return 0 users', async () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: '{findAllUsers {user_id,full_name,email,password,role} }',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.findAllUsers).toEqual([]);
          expect(res.body.data.findAllUsers).toHaveLength(0);
        });
    });

    it('Should return 404 with incorrect id when find user by id', async () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query:
            '{findUserById(user_id: "29809659-8c67-4798-aa17-d6f70ac6b5e2") {full_name,email} }',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toBeNull();
          expect(res.body.errors[0].message).toEqual('User dose not exits!');
          expect(res.body.errors[0].status).toEqual(404);
        });
    });

    it('Should create a new user using createUser mutation', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query:
            'mutation {createUser(createUserDto: {full_name: "test user 4",user_name: "testuser4",password: ' +
            ' "123456789",email: "test.user4@gmail.com"}) {full_name, user_name, email, role}}',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toEqual(userTesting.data);
        });
    });

    it('Should return 1 user', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: '{findAllUsers {full_name, user_name, email, role} }',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.findAllUsers).toEqual([
            userTesting.data.createUser,
          ]);
        });
    });

    it('Should return 409 when create a new user with duplicate email using createUser mutation', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query:
            'mutation {createUser(createUserDto: {full_name: "test user 4",user_name: "testuser4",password: ' +
            ' "123456789",email: "test.user4@gmail.com"}) {full_name, user_name, email}}',
        })
        .expect(200)
        .expect((res) => {
          const error = res.body.errors[0];
          expect(error.message).toEqual('User already exists');
          expect(error.code).toEqual('Conflict');
          expect(error.status).toEqual(409);
        });
    });
  });

  afterAll(async () => {
    const dataSource = app.get(DataSource);
    if (dataSource) {
      console.log('Drop database');
      await dataSource.dropDatabase();
      await dataSource.destroy();
    }
    await app.close();
  });
});
