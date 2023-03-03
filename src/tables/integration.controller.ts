import { Controller, Get } from '@nestjs/common';
import { TablesService } from './tables.service';

@Controller('integration')
export class IntegrationController {
  constructor(private readonly tablesService: TablesService) {}

  @Get('sync')
  getHello(): ReturnType<typeof TablesService.prototype.sync> {
    return this.tablesService.sync();
  }
}
