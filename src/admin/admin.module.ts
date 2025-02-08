import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UserRepository } from 'src/users/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AdminController],
  providers: [AdminService, UserRepository],
})
export class AdminModule {}
