import * as Faker from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import { User } from 'src/api/user/entities/user.entity';

define(User, ({ faker }: typeof Faker) => {
  const user: User = new User();
  user.name = faker.name.firstName();
  user.email = faker.internet.email();
  user.password = 'kyy';
  return user;
});
