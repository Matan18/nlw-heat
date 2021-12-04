import { Request, Response } from "express";
import { CreateMessageService } from "../services/CreateMessageService";

class CreateMessageController {
  async handle(request: Request, response: Response) {
    const { user_id, body: { message } } = request;
    const createMessageService = new CreateMessageService();

    try {
      const result = await createMessageService.execute(message, user_id);
      return response.json(result)
    } catch (error) {
      console.log({ error });

      return response.status(500).json({
        message: "Ocorreu um erro ao tentar criar a mensagem",
        error: error.message
      })
    }
  }
}

export { CreateMessageController };