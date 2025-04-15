import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';

// eslint-disable-next-line prettier/prettier
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://localhost:27017/blog-db',
        connectTimeoutMS: 10000,
        serverSelectionTimeoutMS: 5000,
        maxPoolSize: 10,
        retryAttempts: 3,
        retryDelay: 1000,
      }),
    }),
    AuthModule,
    BlogModule,
    MongooseModule.forRoot('mongodb://localhost:27017/blog-db'),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
