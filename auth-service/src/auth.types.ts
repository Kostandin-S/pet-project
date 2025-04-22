export type RegisterUserReqBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  nickname?: string;
  bio?: string;
  isAdmin: boolean;
};

export type CreateUserParams = Omit<
  RegisterUserReqBody,
  "nickname" | "bio" | "firstName" | "lastName"
>;

export type CreateProfileParams = Omit<
  RegisterUserReqBody,
  "email" | "password" | "isAdmin"
> & { userId: string };

export type LoginUserReqBody = {
  email: string;
  password: string;
};
