// src/entity/User.ts
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import * as bcrypt from "bcrypt"
import { sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { Course } from './course.entity';
import { Exclude } from 'class-transformer';
import { CourseReview } from './course-review.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone?: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default:  UserRole.USER })
  role: UserRole;

  @OneToMany(() => CourseReview, courseReview => courseReview.user)
  reviews: CourseReview[];

  @BeforeInsert()
  async hashPasswordBeforeInsert(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeUpdate()
  async hashPasswordBeforeUpdate(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  generateToken(configService: ConfigService): string {
    const payload: AuthUser = {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      role: this.role,
    };

    const secret = configService.get<string>('JWT_SECRET', 'default_secret');
    const options = { expiresIn: '1h' as const };

    return sign(payload, secret, options);
  }
}

export class AuthUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}
