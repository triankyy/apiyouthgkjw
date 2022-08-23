import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const InjectUser: (...dataOrPipes: any[]) => ParameterDecorator =
  createParamDecorator((data: any, context: ExecutionContext) => {
    const req: any = context.switchToHttp().getRequest();
    req.body.user = req.user;
    return req.body;
  });
