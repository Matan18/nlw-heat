import { Request, Response } from "express";
import { GetLast3MessagesService } from "../services/GetLast3MessagesService";

class Get3LastMessageController {
  async handle(_request: Request, response: Response) {
    const getLast3MessagesService = new GetLast3MessagesService();

    const result = await getLast3MessagesService.execute();

    return response.json(result)
  }
}

export { Get3LastMessageController };