import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Role } from '../user/entities/role.entity';

//cek user role = admin ?
@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const roles: Role[] = user.roles;
    const isAdmin =
      roles.filter((el) => el.name == 'admin').length > 0 ? true : false;
    if (!isAdmin) throw new UnauthorizedException();
    return true;
  }
}
