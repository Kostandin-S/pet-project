export type UpdateUserRequestBody = {
  firstName?: string;
  lastName?: string;
  nickname?: string;
  bio?: string;
};

export type RegisterUserReqBody = {
  userId: string;
  firstName: string;
  lastName: string;
  nickname?: string;
  bio?: string;
};

export type UserDeleteMessage = {
  userId: string;
};
