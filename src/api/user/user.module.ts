import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { Role } from './entities/role.entity';
import { Wilayah } from './entities/wilayah.entity';
import { WilayahController } from './wilayah.controller';
import { WilayahService } from './wilayah.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Wilayah])],
  controllers: [UserController, RoleController, WilayahController],
  providers: [UserService, RoleService, WilayahService],
  exports: [UserService, RoleService, WilayahService],
})
export class UserModule {}
