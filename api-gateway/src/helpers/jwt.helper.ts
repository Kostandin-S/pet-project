import jwt from "jsonwebtoken";

import envVars from "../constants/env-vars";

type JwtPayload = {
  iss: string;
  iat: number;
  exp: number;
};

export const generateToken = () => {
  const payload: JwtPayload = {
    iss: "api-gateway",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 300, // 5 min
  };

  return jwt.sign(payload, envVars.JWT_SECRET);
};
