import { BadRequestException, ValidationPipe } from "@nestjs/common";

export const appValidationRequestPipe = new ValidationPipe({
  exceptionFactory: (errors) => {
    const formattedErrors = errors.map((error) => {
      let messages = [];
      for (const key in error.constraints) {
        if (Object.prototype.hasOwnProperty.call(error.constraints, key)) {
          messages = [...messages, error.constraints[key]];
        }
      }
      return {
        target: error.property,
        messages,
      };
    });

    return new BadRequestException(formattedErrors);
  },
});
