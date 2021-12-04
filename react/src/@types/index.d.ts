interface IUser {
  id: string;
  avatar_url: string;
  name: string;
  login: string;
}


interface IMessage {
  id: string;
  text: string;
  user_id: string;
  user: IUser
}