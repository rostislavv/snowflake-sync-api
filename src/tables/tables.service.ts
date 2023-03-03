import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Table, TableDocument } from './schemas/tables.schema';
import { CreateTableDto } from './dto/create.dto';
import { SnowflakeService } from '../services/snowflake/snowflake.service';
import { SNOWFLAKE_SERVICE_TOKEN } from '../services/snowflake/constants';

@Injectable()
export class TablesService {
  constructor(
    @InjectModel(Table.name) private readonly tableModel: Model<TableDocument>,
    @Inject(SNOWFLAKE_SERVICE_TOKEN)
    private readonly snowflakeService: SnowflakeService,
  ) {}

  async create(createTableDto: CreateTableDto): Promise<Table> {
    const createdCat = await this.tableModel.create(createTableDto);
    return createdCat;
  }

  async findAll(): Promise<Table[]> {
    return this.tableModel.find().exec();
  }

  async findOne(id: string): Promise<Table> {
    return this.tableModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deleted = await this.tableModel.findByIdAndRemove({ _id: id }).exec();
    return deleted;
  }

  async sync() {
    const sql = `
    select table_schema, table_name, column_name, data_type, is_nullable, column_default from snowflake_sample_data.information_schema.columns;`;
    const res = await this.snowflakeService.execute(sql);
    return res;
  }
}
