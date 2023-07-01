import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import throwCustomError from "../utils/throwError";
import { GatewaysService } from "./gateways.service";
import { CreateGatewayDto } from "./dto/create-gateway.dto";
import { Gateway } from "./schemas/gateway.schema";

@Controller("gateways")
export class GatewaysController {
  constructor(private readonly gatewaysService: GatewaysService) {
  }

  @Post()
  async create(@Body() createGatewayDto: CreateGatewayDto) {
    try {
      await this.gatewaysService.create(createGatewayDto);
    } catch (e) {
      throwCustomError(e);
    }
  }

  @Put(":id")
  async addDevice(@Param("id") id: string, @Body() { deviceId }: { deviceId: string }) {
    return this.gatewaysService.addDevice(id, deviceId);
  }

  @Put(":id")
  async removeDevice(@Param("id") id: string, @Body() { deviceId }: { deviceId: string }) {
    return this.gatewaysService.removeDevice(id, deviceId);
  }

  @Get()
  async findAll(): Promise<Gateway[]> {
    return this.gatewaysService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Gateway> {
    return this.gatewaysService.findOne(id);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.gatewaysService.delete(id);
  }
}
