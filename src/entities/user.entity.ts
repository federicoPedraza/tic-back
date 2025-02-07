// src/entity/User.ts
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from "bcrypt"
import { sign } from 'jsonwebtoken';


export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // Remember: In production, store a hashed password

  @Column({ type: 'enum', enum: UserRole, default:  UserRole.USER })
  role: UserRole;

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

  generateToken(): string {
    const payload: AuthUser = {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      role: this.role
    };

    const secret = process.env.JWT_SECRET || 'default_secret';
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
