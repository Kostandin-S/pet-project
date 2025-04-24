import { GetBookParams, GetBookQueryParams } from "./types";

export const prepareQueryParamsForGetBook = (params: GetBookParams) => {
  const queryParams: GetBookQueryParams = {};

  if (params?.author) {
    queryParams.author = params.author;
  }

  if (params?.title) {
    queryParams.title = params.title;
  }

  if (params?.genres?.length) {
    queryParams.genres = params.genres.join(", ");
  }

  return queryParams;
};
