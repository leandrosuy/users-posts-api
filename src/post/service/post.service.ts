import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entity/post.entity';
import { UserService } from 'src/user/service/user.service';
import { UpdatePostDto } from '../dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private userService: UserService,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async findById(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException('Postagem não encontrada');
    }

    return post;
  }

  async create(createPostDto: UpdatePostDto): Promise<Post> {
    const user = await this.userService.findById(createPostDto.user_id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const post = new Post();
    post.title = createPostDto.title;
    post.body = createPostDto.body;
    post.name = user.name;
    post.user = user;

    return this.postRepository.save(post);
  }

  async updateById(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const existingPost = await this.findById(id);

    if (updatePostDto.user_id) {
      const existingUser = await this.userService.findById(
        updatePostDto.user_id,
      );
      if (!existingUser) {
        throw new NotFoundException('Usuário não encontrado');
      }
      existingPost.user = existingUser;
    }

    Object.assign(existingPost, updatePostDto);
    return this.postRepository.save(existingPost);
  }

  async delete(id: number): Promise<void> {
    const result = await this.postRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Postagem não encontrada para exclusão');
    }
  }
}
