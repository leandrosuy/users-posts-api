import {
  Controller,
  Get,
  Post as HttpPost,
  Body,
  Param,
  Delete,
  Put
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { PostService } from '../service/post.service';
import { Post } from '../entity/post.entity';
import { UpdatePostDto } from '../dto/update-post.dto';

@Controller('posts')
@ApiTags('Postagens')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Retorna todas as postagens',
    type: [Post],
  })
  async findAll(): Promise<Post[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Retorna a notícia com o ID especificado',
    type: Post,
  })
  @ApiNotFoundResponse({ description: 'Notícia não encontrada' })
  async findById(@Param('id') id: number): Promise<Post> {
    return this.postService.findById(id);
  }

  @HttpPost()
  @ApiResponse({
    status: 201,
    description: 'Post criado com sucesso',
    type: Post,
  })

  @ApiBadRequestResponse({ description: 'Requisição inválida' })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado' })
  async create(@Body() updatePostDto: UpdatePostDto): Promise<Post> {
    return this.postService.create(updatePostDto);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Notícia atualizada com sucesso', type: Post })
  @ApiNotFoundResponse({ description: 'Notícia não encontrada para atualização' })
  @ApiBadRequestResponse({ description: 'Requisição inválida' })
  async updateById(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto): Promise<Post> {
    return this.postService.updateById(id, updatePostDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Notícia excluída com sucesso' })
  @ApiNotFoundResponse({ description: 'Notícia não encontrada' })
  async delete(@Param('id') id: number): Promise<void> {
    await this.postService.delete(id);
  }
}
