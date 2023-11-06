import { House } from "./House";
import { Review } from './Review';
import { Prisma } from '@prisma/client';
import { UserArgs } from "@prisma/client/runtime/library";

export interface UserDocument{
  first_name: string;
  last_name: string;
  email: string;
  confirmEmail?: boolean;
  role?: str | undefined;
  age?: number | null; 
  phone: string | null; 
  password: string;
  houses?: House[];
  reviews?: Review[];
}