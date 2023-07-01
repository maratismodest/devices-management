import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import throwCustomError from "../utils/throwError";
import { GatewaysService } from "./gateways.service";
import { CreateGatewayDto } from "./dto/create-gateway.dto";
import { Gateway } from "./schemas/gateway.schema";

@Controller("gateways")
export class GatewaysController {
  constructor(private readonly gatewaysService: GatewaysService) {
  }

  @ApiResponse({ status: 200, type: Gateway })
  @Post()
  async create(@Body() createGatewayDto: CreateGatewayDto) {
    try {
      await this.gatewaysService.create(createGatewayDto);
    } catch (e) {
      throwCustomError(e);
    }
  }

  @ApiResponse({ status: 200, type: Gateway })
  @Put(":id")
  async addDevice(@Param("id") id: string, @Body() { deviceId }: { deviceId: string }) {
    return this.gatewaysService.addDevice(id, deviceId);
  }

  @ApiResponse({ status: 200, type: Gateway })
  @Put(":id")
  async removeDevice(@Param("id") id: string, @Body() { deviceId }: { deviceId: string }) {
    return this.gatewaysService.removeDevice(id, deviceId);
  }

  @ApiResponse({ status: 200, type: [Gateway] })
  @Get()
  async findAll(): Promise<Gateway[]> {
    return this.gatewaysService.findAll();
  }

  @ApiResponse({ status: 200, type: Gateway })
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Gateway> {
    return this.gatewaysService.findOne(id);
  }

  @ApiResponse({ status: 200, type: Gateway })
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.gatewaysService.delete(id);
  }
}
