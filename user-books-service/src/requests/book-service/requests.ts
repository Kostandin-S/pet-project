import axios, { AxiosError, AxiosResponse } from "axios";

import logger from "../../config/logger";
import envVars from "../../constants/env-vars";
import { HttpMethod } from "../../enums/http-methods";
import { internalErrorHandlers } from "../../helpers/internal-errors-handler";
import { generateToken } from "../../helpers/jwt.helper";
import { prepareQueryParamsForGetBook } from "./helper";
import {
  Book,
  GenericError,
  GetBookByIdParams,
  GetBookParams,
  GetBookRecommendationsParams,
  GetBookRecommendationsResponse,
} from "./types";

export const getBooks = async (params: GetBookParams) => {
  const queryParams = prepareQueryParamsForGetBook(params);

  try {
    const response: AxiosResponse<Book[]> = await axios({
      method: HttpMethod.GET,
      headers: {
        Authorization: `Bearer ${generateToken()}`,
      },
      url: envVars.BOOK_SERVICE_URL,
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
      url: `${envVars.BOOK_SERVICE_URL}/${params.bookId}`,
    });

    return response.data;
  } catch (error) {
    const errorData = error as AxiosError<GenericError>;
    const errorResponse: AxiosResponse<GenericError> | undefined =
      errorData.response;
    throw internalErrorHandlers(errorResponse);
  }
};

export const getBookRecommendations = async (
  params: GetBookRecommendationsParams
) => {
  try {
    const response: AxiosResponse<GetBookRecommendationsResponse> = await axios(
      {
        method: HttpMethod.GET,
        headers: {
          Authorization: `Bearer ${generateToken()}`,
        },
        url: `${envVars.BOOK_SERVICE_URL}/recommendations`,
        params,
      }
    );

    return response.data;
  } catch (error) {
    const errorData = error as AxiosError<GenericError>;
    const errorResponse: AxiosResponse<GenericError> | undefined =
      errorData.response;
    logger.error("Error fetching book recommendations", errorResponse);
  }
};
