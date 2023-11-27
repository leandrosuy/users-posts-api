import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id?: number;

  @Column({ nullable: false })
  @ApiProperty()
  name: string;

  @Column({ nullable: false })
  @ApiProperty()
  email: string;

  @Column({ nullable: false })
  @ApiProperty()
  gender: string;

  @Column({ nullable: false })
  @ApiProperty()
  status?: string;
}
