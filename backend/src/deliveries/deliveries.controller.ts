import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';

@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  @Post()
  create(@Body() body: Record<string, unknown>) {
    return this.deliveriesService.create(body);
  }

  @Get()
  findAll() {
    return this.deliveriesService.findAll();
  }

  @Get('stats')
  getStats() {
    return this.deliveriesService.getStats();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    // Aceita motoristaId como alias de driverId (compatibilidade com o frontend)
    const data = { ...body };
    if (data.motoristaId !== undefined) {
      data.driverId = data.motoristaId;
      delete data.motoristaId;
    }
    return this.deliveriesService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveriesService.remove(+id);
  }
}
