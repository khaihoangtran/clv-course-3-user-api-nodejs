import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.NODE_ENV ? 'test' : process.env.PG_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, res }) => ({ req, res }),
      formatError: (error) => {
        let message = !error.extensions.originalError
          ? [error.message]
          : error.extensions.originalError['message'];
        let code =
          error.extensions?.originalError?.['error'] ||
          error.extensions?.code ||
          'SERVER_ERROR';
        let status =
          error.extensions?.status ||
          error.extensions?.originalError?.['statusCode'] ||
          500;
        if (error.extensions?.code === 'GRAPHQL_VALIDATION_FAILED') {
          code = 'BAD REQUEST';
          status = 400;
        }

        const graphQLFormattedError = {
          message,
          code,
          status,
        };
        return graphQLFormattedError;
      },
    }),
  ],
})
export class AppModule {}
