export type Profile = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  nickname?: string;
  bio?: string;
};

export type GenericError = {
  name: string;
  message: string;
  details: string;
};
