import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import throwCustomError from "../utils/throwError";
import { DevicesService } from "./devices.service";
import { CreateDeviceDto } from "./dto/create-device.dto";
import { Device } from "./schemas/device.schema";


@ApiTags("Devices")
@Controller("devices")
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {
  }

  @Post()
  async create(@Body() createDeviceDto: CreateDeviceDto) {
    try {
      await this.devicesService.create(createDeviceDto);
    } catch (err) {
      throwCustomError(err);
    }
  }

  @ApiResponse({ status: 200, type: CreateDeviceDto })
  @Get()
  async findAll(): Promise<Device[]> {
    return this.devicesService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Device> {
    return this.devicesService.findOne(id);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.devicesService.delete(id);
  }
}
