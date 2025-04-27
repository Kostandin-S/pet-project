import axios, { AxiosResponse } from "axios";

import { HttpMethod } from "../../../enums/http-methods";
import { InternalServerError } from "../../../utils/errors";
import { GoogleBooksApiResponse } from "../types";

type Params = {
  title: string;
  author: string;
};

export const searchBookInGoogleBooks = async (params: Params) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${params.title}+inauthor:${params.author}`;

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
