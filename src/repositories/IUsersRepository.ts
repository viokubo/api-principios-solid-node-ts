import { User } from "../entities/User";

export interface IUsersRepository {
  findyByEmail(email: string): Promise<User | undefined>;
  save(user: User): Promise<void>;
}
