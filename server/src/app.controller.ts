import { Controller, Get } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AppService } from "./app.service";

@ApiTags("Check")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiResponse({ status: 200, type: String })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
