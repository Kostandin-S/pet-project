export type Book = {
  id: string;
  title: string;
  author: string;
  publishedDate?: Date;
  isbn?: string;
  createdAt: Date;
  updatedAt: Date;
  genres: string[];
};

export type GetBookParams = {
  author: string;
  title: string;
};

export type GenericError = {
  name: string;
  message: string;
  details: string;
};
