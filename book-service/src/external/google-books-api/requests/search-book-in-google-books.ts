import axios, { AxiosResponse } from 'axios';

import { HttpMethod } from '../../../enums/http-methods';
import { InternalServerError } from '../../../utils/errors';
import { generateRequestQuery } from '../helpers';
import {
  FuncParams,
  GoogleBooksApiResponse,
} from '../types';

export const searchBookInGoogleBooks = async (params: FuncParams) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${generateRequestQuery(
    params
  )}`;

  try {
    const response: AxiosResponse<GoogleBooksApiResponse> = await axios({
      method: HttpMethod.GET,
      url,
    });

    return response.data;
  } catch (error) {
    throw new InternalServerError(error);
  }
};
