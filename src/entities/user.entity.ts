// src/entity/User.ts
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from "bcrypt"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, default: "" })
  firstName: string;

  @Column({ length: 100, default: "" })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // Remember: In production, store a hashed password

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
}
