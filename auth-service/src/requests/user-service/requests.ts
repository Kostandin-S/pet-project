import axios, {
  AxiosError,
  AxiosResponse,
} from 'axios';

import { CreateProfileParams } from '../../auth.types';
import { HttpMethod } from '../../enums/http-methods';
import { internalErrorHandlers } from '../../helpers/internal-errors-handler';
import { generateToken } from '../../helpers/jwt.helper';
import { GenericError, Profile } from './types';

export const createProfile = async (params: CreateProfileParams) => {
  try {
    const response: AxiosResponse<Profile> = await axios({
      method: HttpMethod.POST,
      headers: {
        Authorization: `Bearer ${generateToken()}`,
      },
      url: process.env.USER_SERVICE_URL,
      data: params,
    });

    return response.data;
  } catch (error) {
    const errorData = error as AxiosError<GenericError>;
    const errorResponse: AxiosResponse<GenericError> | undefined =
      errorData.response;
    throw internalErrorHandlers(errorResponse);
  }
};
