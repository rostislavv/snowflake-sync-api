import { Controller, Get, Param } from '@nestjs/common';
import { TablesService } from './tables.service';

@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Get()
  findAll(): ReturnType<typeof TablesService.prototype.findAll> {
    return this.tablesService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ): ReturnType<typeof TablesService.prototype.findOne> {
    return this.tablesService.findOne(id);
  }
}
