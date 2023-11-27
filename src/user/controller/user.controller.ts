import { Controller, Get, Post, Body, Put, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { UserService } from '../service/user.service';
import { ApiTags, ApiResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
@ApiTags('Usuários')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Retorna todos os usuários', type: User })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Retorna um usuário pelo ID', type: User })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado' })
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findById(Number(id));
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Retorna o usuário criado', type: User })
  async create(@Body() user: User): Promise<User> {
    if (!user.name) {
      throw new HttpException('O campo "name" não foi informado.', HttpStatus.BAD_REQUEST);
    }

    if (!user.email) {
      throw new HttpException('O campo "email" não foi informado.', HttpStatus.BAD_REQUEST);
    }

    if (!user.gender) {
      throw new HttpException('O campo "gender" não foi informado.', HttpStatus.BAD_REQUEST);
    }

    return this.userService.create(user);
  }


  @Put(':id')
  @ApiResponse({ status: 200, description: 'Retorna o usuário atualizado', type: User })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado' })
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Usuário excluído com sucesso' })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado' })
  async delete(@Param('id') id: number): Promise<void> {
    return this.userService.delete(id);
  }
}
