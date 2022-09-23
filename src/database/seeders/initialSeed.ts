import { Factory, Seeder } from 'typeorm-seeding';
import { DataSource } from 'typeorm';
import { User } from 'src/api/user/entities/user.entity';

// export default class InitialDatabaseSeed implements Seeder {
//   public async run(factory: Factory, connection: DataSource): Promise<void> {
//     const user: User[] = factory(User)().createMany(3);
//   }
// }
