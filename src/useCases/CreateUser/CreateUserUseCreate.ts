import { User } from "../../entities/User";
import { IMailProvider } from "./../../providers/IMailProvider";
import { IUsersRepository } from "./../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./ICreateUserDTO";

export class CreateUserUseCase {
  private usersRepository!: IUsersRepository;
  private mailProvider!: IMailProvider;

  contructor(usersRepository: IUsersRepository, mailProvider: IMailProvider) {
    this.usersRepository = usersRepository;
    this.mailProvider = mailProvider;
  }

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findyByEmail(
      data.email
    );

    if (userAlreadyExists) {
      throw new Error("User already exists.");
    }

    const user = new User(data);
    this.mailProvider.sendMail({
      to: {
        email: data.email,
        name: data.name,
      },
      from: {
        name: "Equipe",
        email: "equipe@app.com",
      },
      subject: "Seja bem vindo",
      body: "<p>Voce ja pode logar em nossa plataforma.</p>",
    });

    await this.usersRepository.save(user);
  }
}
