import {
  AxiosResponse,
  HttpStatusCode,
} from 'axios';

import { ErrorMessages } from '../constants/errors';
import { GenericError } from '../requests/user-service/types';
import {
  BadRequest,
  Conflict,
  InternalServerError,
  NotAuthenticated,
  NotAuthorized,
  NotFoundError,
  UnprocessableEntity,
} from '../utils/errors';

export const handleInterServiceError = (
  error: AxiosResponse<GenericError> | undefined
) => {
  const statusCode = error?.status || HttpStatusCode.InternalServerError;
  const details = error?.data?.details || ErrorMessages.SOMETHING_WENT_WRONG;

  switch (statusCode) {
    case HttpStatusCode.BadRequest:
      return new BadRequest(details);
    case HttpStatusCode.Unauthorized:
      return new NotAuthenticated(details);
    case HttpStatusCode.Forbidden:
      return new NotAuthorized(details);
    case HttpStatusCode.NotFound:
      return new NotFoundError(details);
    case HttpStatusCode.Conflict:
      return new Conflict(details);
    case HttpStatusCode.UnprocessableEntity:
      return new UnprocessableEntity(details);
    default:
      return new InternalServerError(details);
  }
};
