import { Controller, Get, Param, Query } from '@nestjs/common';
import { PaginationParams } from '../common/pagination';
import { TablesService } from './tables.service';

@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Get(':table')
  findForTable(
    @Param('table') tableName: string,
  ): ReturnType<typeof TablesService.prototype.findForTable> {
    return this.tablesService.findForTable(tableName);
  }

  @Get()
  findAll(
    @Query() { startId, skip, limit }: PaginationParams,
  ): ReturnType<typeof TablesService.prototype.findAll> {
    return this.tablesService.findAll(skip, limit, startId);
  }
}
