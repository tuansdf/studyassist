import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";
import { CustomException } from "../exceptions/custom-exception.js";
import { CommonResponse } from "../types/common.type.js";

const DEFAULT_ERROR = "Something Went Wrong";

class ExceptionUtils {
  public getResponse = (error: Error): [number, CommonResponse] => {
    let errorMessage = "";
    let status = 500;
    if (error instanceof CustomException) {
      status = error.status || 400;
      errorMessage = error.message;
    }
    if (error instanceof HTTPException) {
      status = error.status || 500;
      errorMessage = error.message;
    }
    if (error instanceof ZodError) {
      status = 400;
      errorMessage = error.errors[0]?.message!;
    }
    return [status, { message: errorMessage || DEFAULT_ERROR, status }];
  };

  public getMessage = (err: Error): string => {
    return this.getResponse(err)[1].message!;
  };

  public toResponse(error: Error) {
    const [status, response] = this.getResponse(error);
    return Response.json(response, { status: status });
  }
}

export const exceptionUtils = new ExceptionUtils();
