import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SnowflakeModule } from '../services/snowflake/snowflake.module';
import { Table, TableSchema } from './schemas/tables.schema';
import { IntegrationController } from './integration.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Table.name, schema: TableSchema }]),
    SnowflakeModule,
  ],
  controllers: [TablesController, IntegrationController],
  providers: [TablesService],
})
export class TablesModule {}
