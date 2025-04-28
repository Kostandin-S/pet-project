import axios, {
  AxiosError,
  AxiosResponse,
} from 'axios';

import { CreateProfileParams } from '../../auth.types';
import envVars from '../../constants/env-vars';
import { HttpMethod } from '../../enums/http-methods';
import { handleInterServiceError } from '../../helpers/handle-inter-service-error';
import { generateToken } from '../../helpers/jwt.helper';
import { GenericError, Profile } from './types';

export const createProfile = async (params: CreateProfileParams) => {
  try {
    const response: AxiosResponse<Profile> = await axios({
      method: HttpMethod.POST,
      headers: {
        Authorization: `Bearer ${generateToken()}`,
      },
      url: envVars.USER_SERVICE_URL,
      data: params,
    });

    return response.data;
  } catch (error) {
    const errorData = error as AxiosError<GenericError>;
    const errorResponse: AxiosResponse<GenericError> | undefined =
      errorData.response;
    throw handleInterServiceError(errorResponse);
  }
};
