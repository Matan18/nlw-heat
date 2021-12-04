import { io } from "../app";
import { prismaClient } from "../prisma";

class CreateMessageService {
  async execute(text: string, user_id: string) {
    console.log(user_id);

    const message = await prismaClient.message.create({
      data: {
        text,
        user_id,
      },
      include: {
        user: true,
      }
    });

    const { created_at, user: { name, avatar_url }, id } = message;

    const infoWS = {
      id,
      text,
      user_id,
      created_at,
      user: {
        name,
        avatar_url,
      }
    };
    io.emit("new_message", infoWS);

    return message;
  }
}

export { CreateMessageService };