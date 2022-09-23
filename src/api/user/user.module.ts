import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { Role } from './entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [UserController, RoleController],
  providers: [UserService, RoleService],
  exports: [UserService, RoleService],
})
export class UserModule {}
