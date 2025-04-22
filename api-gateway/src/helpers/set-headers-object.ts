import { ClientRequest } from "http";

import { generateToken } from "./jwt.helper";

export const setHeadersObject = (proxyReq: ClientRequest) => {
  const headers = new Headers({
    Authorization: `Bearer ${generateToken()}`,
  });

  proxyReq.setHeaders(headers);
};
