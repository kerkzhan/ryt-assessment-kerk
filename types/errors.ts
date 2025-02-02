import { ERROR_CODES } from "@/constants/error-codes";

type ErrorCodeType = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

export interface ApiError {
  code: ErrorCodeType;
  message: string;
}

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: ApiError;
  }
}
