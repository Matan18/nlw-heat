import axios from "axios";
import { sign } from "jsonwebtoken";
import { prismaClient } from "../prisma"

interface IAccessTokenReponse {
  access_token: string;
}

interface IUserResponse {
  id: number;
  name: string;
  login: string;
  avatar_url: string;
}

class AuthenticateUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";
    const { data: accessTokenResponse } = await axios.post<IAccessTokenReponse>(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        "Accept": "application/json"
      }
    });

    const { data: {
      id, name, login, avatar_url
    } } = await axios.get<IUserResponse>("https://api.github.com/user", {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`,
      }
    })

    let user = await prismaClient.user.findFirst({
      where: {
        github_id: id
      }
    })

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          name,
          login,
          github_id: id,
          avatar_url
        }
      });
    }

    const token = sign(
      { user: { name, avatar_url, id } },
      process.env.JWT_SECRET,
      { subject: user.id, expiresIn: '1d' }
    );

    return { token, user };
  }
}

export { AuthenticateUserService };