import { RowDataPacket } from "mysql2/promise";

export type UserType = {
  user_id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  created_at: Date;
};

export type UserRowDataPacket = UserType & RowDataPacket;