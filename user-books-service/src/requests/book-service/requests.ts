import axios, {
  AxiosError,
  AxiosResponse,
} from 'axios';

import { HttpMethod } from '../../enums/http-methods';
import { internalErrorHandlers } from '../../helpers/internal-errors-handler';
import { generateToken } from '../../helpers/jwt.helper';
import {
  Book,
  GenericError,
  GetBookParams,
} from './types';

export const getBooks = async (params: GetBookParams) => {
  try {
    const response: AxiosResponse<Book[]> = await axios({
      method: HttpMethod.GET,
      headers: {
        Authorization: `Bearer ${generateToken()}`,
      },
      url: process.env.BOOK_SERVICE_URL,
      params,
    });

    return response.data;
  } catch (error) {
    const errorData = error as AxiosError<GenericError>;
    const errorResponse: AxiosResponse<GenericError> | undefined =
      errorData.response;
    throw internalErrorHandlers(errorResponse);
  }
};
