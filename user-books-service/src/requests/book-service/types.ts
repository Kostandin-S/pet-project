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
  author?: string;
  title?: string;
  genres?: string[];
};

export type GetBookQueryParams = {
  author?: string;
  title?: string;
  genres?: string;
};

export type GetBookByIdParams = {
  bookId: string;
};

export type GenericError = {
  name: string;
  message: string;
  details: string;
};

export type GetBookRecommendationsParams = {
  genre: string;
};

export type GetBookRecommendationsResponse = {
  title: string;
  author: string;
}[];
