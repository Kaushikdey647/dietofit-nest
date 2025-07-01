// Interface for User (Postgres)
export interface IUser {
  id: number;
  email: string;
  name: string;
}

// Interface for User (Mongo)
export interface IUserMongo {
  _id: string;
  email: string;
  name: string;
}
