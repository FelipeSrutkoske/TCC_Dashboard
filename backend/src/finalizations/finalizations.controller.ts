import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FinalizationsService } from './finalizations.service';
import { Finalization } from './entities/finalization.entity';

@Controller('finalizations')
export class FinalizationsController {
  constructor(private readonly finalizationsService: FinalizationsService) {}

  @Post()
  create(@Body() body: Partial<Finalization>) {
    return this.finalizationsService.create(body);
  }

  @Get()
  findAll() {
    return this.finalizationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.finalizationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Partial<Finalization>) {
    return this.finalizationsService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.finalizationsService.remove(+id);
  }
}
