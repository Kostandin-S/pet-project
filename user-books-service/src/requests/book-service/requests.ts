import axios, { AxiosError, AxiosResponse } from "axios";

import { HttpMethod } from "../../enums/http-methods";
import { internalErrorHandlers } from "../../helpers/internal-errors-handler";
import { generateToken } from "../../helpers/jwt.helper";
import { prepareQueryParamsForGetBook } from "./helper";
import { Book, GenericError, GetBookByIdParams, GetBookParams } from "./types";

export const getBooks = async (params: GetBookParams) => {
  const queryParams = prepareQueryParamsForGetBook(params);

  try {
    const response: AxiosResponse<Book[]> = await axios({
      method: HttpMethod.GET,
      headers: {
        Authorization: `Bearer ${generateToken()}`,
      },
      url: process.env.BOOK_SERVICE_URL,
      params: queryParams,
    });

    return response.data;
  } catch (error) {
    const errorData = error as AxiosError<GenericError>;
    const errorResponse: AxiosResponse<GenericError> | undefined =
      errorData.response;
    throw internalErrorHandlers(errorResponse);
  }
};

export const getBookById = async (params: GetBookByIdParams) => {
  try {
    const response: AxiosResponse<Book> = await axios({
      method: HttpMethod.GET,
      headers: {
        Authorization: `Bearer ${generateToken()}`,
      },
      url: `${process.env.BOOK_SERVICE_URL}/${params.bookId}`,
    });

    return response.data;
  } catch (error) {
    const errorData = error as AxiosError<GenericError>;
    const errorResponse: AxiosResponse<GenericError> | undefined =
      errorData.response;
    throw internalErrorHandlers(errorResponse);
  }
};
