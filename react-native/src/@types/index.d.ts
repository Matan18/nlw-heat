type IUser = {
  avatar_url: string;
  name: string;
  login: string;
}


type IMessage = {
  id: string;
  text: string;
  user: IUser
}
