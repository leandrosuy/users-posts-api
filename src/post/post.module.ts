// post.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { Post } from './entity/post.entity';
import { PostController } from './controller/post.controller';
import { PostService } from './service/post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UserModule],
  controllers: [PostController],
  providers: [PostService   ],
})
export class PostModule {}
