import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GatewaysService } from './gateways.service';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { Gateway } from './schemas/gateway.schema';

@Controller('gateways')
export class GatewaysController {
  constructor(private readonly catsService: GatewaysService) {}

  @Post()
  async create(@Body() createCatDto: CreateGatewayDto) {
    await this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Gateway[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Gateway> {
    return this.catsService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.catsService.delete(id);
  }
}
