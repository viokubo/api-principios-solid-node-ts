import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCreate";

export class CreateUserController {
  private creatUserUseCase!: CreateUserUseCase;

  constructor(creatUserUseCase: CreateUserUseCase) {
    this.creatUserUseCase = creatUserUseCase;
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    try {
      await this.creatUserUseCase.execute({ name, email, password });
      return res.sendStatus(201);
    } catch (err) {
      return res.status(400).json({ message: err || "Unexpected error." });
    }
  }
}
