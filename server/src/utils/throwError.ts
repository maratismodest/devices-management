import { HttpException, HttpStatus } from "@nestjs/common";

const throwCustomError = (err) => {
  throw new HttpException(err.code === 11000 ? "Item should be unique" : "Forbidden", HttpStatus.FORBIDDEN);
};

export default throwCustomError;
