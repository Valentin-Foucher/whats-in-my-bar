import { snakeCase } from 'lodash';

declare type ErrorInterface = Error;

module Errors {
  declare class Error implements ErrorInterface {
    name: string;
    message: string;
    stack?: string;
    static captureStackTrace(object: Error, objectConstructor?: Function ): void;
  };

  export class ServiceError extends Error {
    name: string;
    message: string;
    stack?: string;
    statusCode: number;

    constructor(message: string, { statusCode = 500 } = {}) {
      super();
      this.message = message;
      this.statusCode = statusCode;
      if (typeof Error.captureStackTrace === 'function') {
        Error.captureStackTrace(this, this.constructor);
      };
    };

    toJSON() {
      return {
        type: snakeCase(this.name),
        message: this.message
      };
    };
  }
}

export default Errors.ServiceError;