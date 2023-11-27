import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '@Lodj21#',
    database: 'users_posts_db',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
  UserModule,
  PostModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
