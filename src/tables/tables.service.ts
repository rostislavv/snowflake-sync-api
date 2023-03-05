import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { Table, TableDocument } from './schemas/tables.schema';
import { SnowflakeService } from '../services/snowflake/snowflake.service';
import { SNOWFLAKE_SERVICE_TOKEN } from '../services/snowflake/constants';

@Injectable()
export class TablesService {
  constructor(
    @InjectModel(Table.name) private readonly tableModel: Model<TableDocument>,
    @Inject(SNOWFLAKE_SERVICE_TOKEN)
    private readonly snowflakeService: SnowflakeService,
    private configService: ConfigService,
  ) {}

  async create(createTableDto: Partial<Table>): Promise<Table | never> {
    try {
      const createdDocument = await this.tableModel.create(createTableDto);
      return createdDocument;
    } catch (e) {
      throw new Error('Unable to create document: ' + e.message);
    }
  }

  async findAll(
    documentsToSkip = 0,
    limitOfDocuments?: number,
    startId?: string,
  ): Promise<Table[]> {
    // if we don't provide startId - we need to start fetching from somewhere
    // e.g - hard beginning
    // later on - fetching will be offset based (objectId needed)
    const findCondition = startId
      ? {
          _id: {
            $gt: startId,
          },
        }
      : undefined;

    const findQuery = this.tableModel
      .find(findCondition)
      .sort({ _id: 1 })
      .skip(documentsToSkip);

    if (limitOfDocuments) {
      findQuery.limit(limitOfDocuments);
    }

    return await findQuery.exec();
  }

  async findForTable(tableName: string): Promise<Table[]> {
    return this.tableModel.find({ TABLE_NAME: tableName }).exec();
  }

  async findOne(id: string): Promise<Table> {
    return this.tableModel.findOne({ _id: id }).exec();
  }

  async updateBy(
    props: Pick<Table, 'TABLE_SCHEMA' | 'TABLE_NAME' | 'COLUMN_NAME'>,
    data: Partial<Table>,
  ): Promise<Table> {
    return this.tableModel.findOneAndUpdate(props, data).exec();
  }

  async sync() {
    const database = this.configService.get('SNOWFLAKE_DATABASE');
    // let's select everything
    // we also could consider constructing this query based on Table properties
    // something like 'Reflect.getMetadata('design:type', Table)';
    // but i'm assuming that information_schema is reliable enough to leave with wildcard for bootstrapping purposes
    const sql = `select * from ${database}.information_schema.columns;`;

    // another spot for improvements - use Stream to load in mongoose
    // another spot for improvement - add Bull.js or similar to not to hold connection for user, just immediately respond with 'OK' and process job in background
    const res = await this.snowflakeService.execute(sql);
    const createPromises = res.map(async (entry) => {
      try {
        await this.create(entry);
      } catch (e) {
        // we are going to silently ignore creationErrors for integrations
        // this will mean that target - TABLE_SCHEMA, TABLE_NAME, COLUMN_NAME exists, so we need to fetch this document and update fields
        await this.updateBy(
          {
            TABLE_SCHEMA: entry.TABLE_SCHEMA,
            TABLE_NAME: entry.TABLE_NAME,
            COLUMN_NAME: entry.COLUMN_NAME,
          },
          entry,
        );
      }
    });
    // let's batch-sync
    await Promise.all(createPromises);
    // as mentioned - not neccesary
    return res;
  }
}
